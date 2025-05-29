import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
  Timestamp,
  getDoc,
  limit,
} from "firebase/firestore";
import { 
  Loader2, 
  Trophy, 
  Users, 
  Swords,
  Timer,
  Code,
  Star,
  Medal,
  Shield,
  Crown,
  Rocket,
  ArrowRight,
  CheckCircle,
  Target,
  AlertCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

interface Player {
  uid: string;
  displayName: string;
  photoURL: string;
  score: number;
  rank: string;
  status: 'waiting' | 'playing' | 'submitted' | 'spectating';
  submissionTime?: Date;
  correct?: boolean;
}

interface BattleGame {
  id: string;
  status: 'waiting' | 'inProgress' | 'finished';
  players: Player[];
  challenge: {
    title: string;
    description: string;
    initialCode: string;
    expectedOutput: string;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
  };
  startTime?: Date;
  endTime?: Date;
  winner?: string;
}

const GAME_MODE = {
  name: "Classic Battle",
  description: "First to solve wins! Race against other players to complete the challenge.",
  icon: Swords,
  color: "bg-blue-500/10 text-blue-500",
  timeLimit: 300, // 5 minutes
  minPlayers: 2,
  maxPlayers: 2
};

const CHALLENGES = {
  html: [
    {
      title: "Create a Navigation Menu",
      description: "Create a horizontal navigation menu with 4 links: Home, About, Services, Contact",
      initialCode: "<!-- Create your navigation menu here -->",
      expectedOutput: "<nav><ul><li><a href=\"#\">Home</a></li><li><a href=\"#\">About</a></li><li><a href=\"#\">Services</a></li><li><a href=\"#\">Contact</a></li></ul></nav>",
      difficulty: "easy",
      points: 100
    },
    {
      title: "Build a Contact Form",
      description: "Create a contact form with name, email, and message fields",
      initialCode: "<!-- Create your contact form here -->",
      expectedOutput: "<form><input type=\"text\" name=\"name\" placeholder=\"Name\"><input type=\"email\" name=\"email\" placeholder=\"Email\"><textarea name=\"message\" placeholder=\"Message\"></textarea><button type=\"submit\">Send</button></form>",
      difficulty: "medium",
      points: 150
    }
  ]
};

const RANKS = {
  bronze: { min: 0, max: 999, icon: Shield, color: "bg-orange-500/10 text-orange-500" },
  silver: { min: 1000, max: 2499, icon: Medal, color: "bg-slate-400/10 text-slate-400" },
  gold: { min: 2500, max: 4999, icon: Star, color: "bg-yellow-500/10 text-yellow-500" },
  platinum: { min: 5000, max: 9999, icon: Crown, color: "bg-purple-500/10 text-purple-500" },
  diamond: { min: 10000, max: Infinity, icon: Trophy, color: "bg-blue-500/10 text-blue-500" }
};

const getRank = (points: number): string => {
  for (const [rank, { min, max }] of Object.entries(RANKS)) {
    if (points >= min && points <= max) return rank;
  }
  return 'bronze';
};

const BattleRoyale = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState<BattleGame | null>(null);
  const [userCode, setUserCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStatus, setGameStatus] = useState<'lobby' | 'playing' | 'results'>('lobby');
  const [availableBattles, setAvailableBattles] = useState<BattleGame[]>([]);

  // Subscribe to available battles
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const battlesRef = collection(db, "battles");
    const q = query(
      battlesRef,
      where("status", "==", "waiting"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const battles = snapshot.docs.map(doc => ({
        ...doc.data() as BattleGame,
        id: doc.id
      }));
      setAvailableBattles(battles);
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  // Subscribe to current game
  useEffect(() => {
    if (!currentUser) return;

    const gamesRef = collection(db, "battles");
    const q = query(
      gamesRef,
      where("players", "array-contains", currentUser.uid),
      where("status", "in", ["inProgress", "finished"]),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const gameData = snapshot.docs[0].data() as BattleGame;
        const game = {
          ...gameData,
          id: snapshot.docs[0].id,
          startTime: gameData.startTime instanceof Timestamp ? gameData.startTime.toDate() : gameData.startTime,
          endTime: gameData.endTime instanceof Timestamp ? gameData.endTime.toDate() : gameData.endTime
        };
        
        setCurrentGame(game);
        setGameStatus(game.status === "inProgress" ? "playing" : "results");
        
        if (game.status === "inProgress" && game.startTime) {
          const elapsed = (Date.now() - game.startTime.getTime()) / 1000;
          setTimeLeft(Math.max(0, GAME_MODE.timeLimit - elapsed));
        }
      } else {
        setCurrentGame(null);
        setGameStatus("lobby");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Game timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (currentGame?.status === "inProgress" && gameStatus === "playing") {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = Math.max(0, prev - 1);
          if (newTime === 0) {
            handleTimeUp();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentGame?.status, gameStatus]);

  const handleTimeUp = async () => {
    if (!currentGame || !currentUser) return;

    const gameRef = doc(db, "battles", currentGame.id);
    await updateDoc(gameRef, {
      players: currentGame.players.map(player => 
        player.uid === currentUser.uid
          ? { ...player, status: 'submitted', submissionTime: serverTimestamp() }
          : player
      )
    });

    const allSubmitted = currentGame.players.every(player => 
      player.status === 'submitted' || player.status === 'spectating'
    );

    if (allSubmitted) {
      await updateDoc(gameRef, {
        status: 'finished',
        endTime: serverTimestamp()
      });
    }
  };

  const createBattle = async () => {
    if (!currentUser) return;

    const challenge = CHALLENGES.html[Math.floor(Math.random() * CHALLENGES.html.length)];
    const newBattle = {
      status: "waiting",
      players: [{
        uid: currentUser.uid,
        displayName: currentUser.displayName || "Anonymous",
        photoURL: currentUser.photoURL || "",
        score: 0,
        rank: "Bronze",
        status: "waiting"
      }],
      challenge: {
        ...challenge,
        timeLimit: GAME_MODE.timeLimit
      },
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "battles"), newBattle);
      toast.success("Battle created! Waiting for players to join...");
    } catch (error) {
      toast.error("Failed to create battle. Please try again.");
      console.error("Error creating battle:", error);
    }
  };

  const joinBattle = async (battleId: string) => {
    if (!currentUser) return;

    const battleRef = doc(db, "battles", battleId);
    const battleDoc = await getDoc(battleRef);
    
    if (!battleDoc.exists()) {
      toast.error("Battle not found");
      return;
    }

    const battle = battleDoc.data() as BattleGame;
    
    if (battle.players.some(p => p.uid === currentUser.uid)) {
      toast.error("You are already in this battle");
      return;
    }

    if (battle.players.length >= GAME_MODE.maxPlayers) {
      toast.error("Battle is full");
      return;
    }

    try {
      const updatedPlayers = [...battle.players, {
        uid: currentUser.uid,
        displayName: currentUser.displayName || "Anonymous",
        photoURL: currentUser.photoURL || "",
        score: 0,
        rank: "Bronze",
        status: "waiting"
      }];

      const shouldStartGame = updatedPlayers.length >= GAME_MODE.minPlayers;

      await updateDoc(battleRef, {
        players: updatedPlayers,
        status: shouldStartGame ? "inProgress" : "waiting",
        startTime: shouldStartGame ? serverTimestamp() : null
      });

      // Force immediate state update for both players
      if (shouldStartGame) {
        const updatedBattle = {
          ...battle,
          id: battleId,
          players: updatedPlayers,
          status: "inProgress",
          startTime: new Date()
        };
        setCurrentGame(updatedBattle);
        setGameStatus("playing");
        setTimeLeft(GAME_MODE.timeLimit);
      }

      toast.success(shouldStartGame ? "Game started!" : "Joined battle successfully!");
    } catch (error) {
      toast.error("Failed to join battle. Please try again.");
      console.error("Error joining battle:", error);
    }
  };

  const handleSubmit = async () => {
    if (!currentGame || !currentUser) return;

    // Validate submission
    const isCorrect = validateSubmission(userCode, currentGame.challenge.expectedOutput);
    const submissionTime = new Date();
    const timeBonus = Math.floor((GAME_MODE.timeLimit - timeLeft) * 0.5);
    const score = isCorrect ? currentGame.challenge.points + timeBonus : 0;

    // Update player status and score
    const gameRef = doc(db, "battles", currentGame.id);
    await updateDoc(gameRef, {
      players: currentGame.players.map(player => 
        player.uid === currentUser.uid
          ? {
              ...player,
              status: 'submitted',
              submissionTime,
              correct: isCorrect,
              score: player.score + score
            }
          : player
      )
    });

    // Check if all players have submitted
    const allSubmitted = currentGame.players.every(player => 
      player.status === 'submitted' || player.status === 'spectating'
    );

    if (allSubmitted) {
      await updateDoc(gameRef, {
        status: 'finished',
        endTime: serverTimestamp(),
        winner: currentGame.players.reduce((a, b) => a.score > b.score ? a : b).uid
      });
    }
  };

  const validateSubmission = (code: string, expected: string): boolean => {
    // Remove whitespace and convert to lowercase for comparison
    const normalizedCode = code.replace(/\s+/g, '').toLowerCase();
    const normalizedExpected = expected.replace(/\s+/g, '').toLowerCase();
    return normalizedCode === normalizedExpected;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2" />
      </div>

      <PageNavigation />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : gameStatus === "lobby" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Battle Royale
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Test your coding skills against other developers in real-time battles!
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-lg", GAME_MODE.color)}>
                        {React.createElement(GAME_MODE.icon, { className: "h-8 w-8" })}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{GAME_MODE.name}</CardTitle>
                        <CardDescription>{GAME_MODE.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={createBattle}
                    >
                      Create Battle
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                  <CardHeader>
                    <CardTitle>Available Battles</CardTitle>
                    <CardDescription>Join an existing battle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {availableBattles.length > 0 ? (
                      <div className="space-y-4">
                        {availableBattles.map(battle => (
                          <div
                            key={battle.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span className="font-medium">
                                  {battle.players.length}/{GAME_MODE.maxPlayers} players
                                </span>
                              </div>
                              <Badge variant="outline">
                                {battle.challenge.difficulty}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => joinBattle(battle.id)}
                            >
                              Join Battle
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No battles available. Create one to get started!
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        ) : gameStatus === "playing" && currentGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-[1fr_300px]"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{currentGame.challenge.title}</CardTitle>
                    <CardDescription>
                      {currentGame.challenge.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {Math.floor(timeLeft / 60)}:{String(Math.floor(timeLeft % 60)).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time Remaining
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-[400px] font-mono p-4 bg-muted/50 rounded-lg focus:ring-2 focus:ring-primary/50"
                      placeholder="Write your code here..."
                    />
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!userCode.trim()}
                  >
                    Submit Solution
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <CardTitle>Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentGame.players.map((player) => (
                      <div
                        key={player.uid}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50"
                      >
                        <Avatar>
                          <AvatarImage src={player.photoURL} />
                          <AvatarFallback>
                            {player.displayName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">
                              {player.displayName}
                            </p>
                            {player.status === 'submitted' && (
                              <Badge variant="outline" className="ml-auto">
                                Submitted
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4" />
                            <span>{player.score} points</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <CardTitle>Challenge Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span>Difficulty</span>
                      </div>
                      <Badge>
                        {currentGame.challenge.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <span>Points</span>
                      </div>
                      <span className="font-bold">
                        {currentGame.challenge.points}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : gameStatus === "results" && currentGame ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">Battle Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Winner</h2>
                    {currentGame.winner && (
                      <div className="inline-block">
                        <div className="relative">
                          <Avatar className="h-20 w-20 border-2 border-yellow-500">
                            <AvatarImage
                              src={currentGame.players.find(p => p.uid === currentGame.winner)?.photoURL}
                            />
                            <AvatarFallback>
                              {currentGame.players.find(p => p.uid === currentGame.winner)?.displayName[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <Crown className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500" />
                        </div>
                        <p className="mt-2 font-bold">
                          {currentGame.players.find(p => p.uid === currentGame.winner)?.displayName}
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    {currentGame.players
                      .sort((a, b) => b.score - a.score)
                      .map((player, index) => (
                        <div
                          key={player.uid}
                          className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                        >
                          <div className="text-2xl font-bold w-8">
                            #{index + 1}
                          </div>
                          <Avatar>
                            <AvatarImage src={player.photoURL} />
                            <AvatarFallback>
                              {player.displayName[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{player.displayName}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                <span>{player.score} points</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {player.submissionTime
                                    ? `${Math.floor((player.submissionTime.getTime() - currentGame.startTime!.getTime()) / 1000)}s`
                                    : 'DNF'}
                                </span>
                              </div>
                            </div>
                          </div>
                          {player.status === 'submitted' && (
                            <div className={cn(
                              "p-2 rounded-full",
                              player.correct
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-red-500"
                            )}>
                              {player.correct
                                ? <CheckCircle className="h-6 w-6" />
                                : <XCircle className="h-6 w-6" />}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={() => {
                        setGameStatus('lobby');
                        setCurrentGame(null);
                      }}
                    >
                      Back to Lobby
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default BattleRoyale; 