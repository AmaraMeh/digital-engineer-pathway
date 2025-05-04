import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  increment,
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
import Editor from "@monaco-editor/react";
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
  mode: 'classic' | 'timeAttack' | 'survival' | 'practice';
  status: 'waiting' | 'countdown' | 'inProgress' | 'finished';
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
  countdownStart?: Date;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  testCases: {
    input: string;
    expectedOutput: string;
    description: string;
    points: number;
  }[];
}

const GAME_MODES = {
  classic: {
    name: "Classic",
    description: "First to solve wins! Race against other players to complete the challenge.",
    icon: Swords,
    color: "bg-blue-500/10 text-blue-500",
    timeLimit: 300 // 5 minutes
  },
  timeAttack: {
    name: "Time Attack",
    description: "Solve as many challenges as you can within the time limit!",
    icon: Timer,
    color: "bg-yellow-500/10 text-yellow-500",
    timeLimit: 600 // 10 minutes
  },
  survival: {
    name: "Survival",
    description: "Last player standing! Make a mistake and you're out.",
    icon: Crown,
    color: "bg-red-500/10 text-red-500",
    timeLimit: 180 // 3 minutes per round
  },
  practice: {
    name: "Practice",
    description: "Practice mode - no time limit, no pressure.",
    icon: Target,
    color: "bg-green-500/10 text-green-500",
    timeLimit: 0
  }
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
    },
    // Add more challenges here
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

const htmlBasicsProblem: Problem = {
  id: "html_basics_1",
  title: "Create a Basic HTML Structure",
  description: `Create a proper HTML structure that includes:
  1. A DOCTYPE declaration
  2. HTML tags with lang="en"
  3. Head section with a title "My First Page"
  4. Body section with:
     - An h1 heading saying "Welcome"
     - A paragraph with the text "This is my first HTML page"
     
  Rules:
  - Each correct element earns points
  - Bonus points for proper indentation
  - Time bonus: +50 points for completing under 2 minutes
  - Perfect score bonus: +100 points for all test cases passing`,
  initialCode: "<!-- Write your HTML code here -->\n",
  expectedOutput: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is my first HTML page</p>
</body>
</html>`,
  timeLimit: 300,
  difficulty: "easy",
  points: 200,
  testCases: [
    {
      input: "",
      expectedOutput: "<!DOCTYPE html>",
      description: "Should have DOCTYPE declaration",
      points: 20
    },
    {
      input: "",
      expectedOutput: '<html lang="en">',
      description: "Should have HTML tag with lang attribute",
      points: 20
    },
    {
      input: "",
      expectedOutput: "<title>My First Page</title>",
      description: "Should have correct title",
      points: 20
    },
    {
      input: "",
      expectedOutput: "<h1>Welcome</h1>",
      description: "Should have h1 heading",
      points: 20
    },
    {
      input: "",
      expectedOutput: "<p>This is my first HTML page</p>",
      description: "Should have paragraph with correct text",
      points: 20
    }
  ]
};

const BattleRoyale = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeMode, setActiveMode] = useState<keyof typeof GAME_MODES>("classic");
  const [currentGame, setCurrentGame] = useState<BattleGame | null>(null);
  const [userCode, setUserCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStatus, setGameStatus] = useState<'lobby' | 'countdown' | 'playing' | 'results'>('lobby');
  const [availableBattles, setAvailableBattles] = useState<BattleGame[]>([]);
  const [showCreateBattle, setShowCreateBattle] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Subscribe to available battles
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

  const createBattle = async (mode: keyof typeof GAME_MODES) => {
    if (!currentUser) return;

    const challenge = CHALLENGES.html[Math.floor(Math.random() * CHALLENGES.html.length)];
    const newBattle = {
      mode,
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
        timeLimit: GAME_MODES[mode].timeLimit
      },
      createdAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "battles"), newBattle);
      toast.success("Battle created! Waiting for players to join...");
      setShowCreateBattle(false);
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

    if (battle.players.length >= 4) {
      toast.error("Battle is full");
      return;
    }

    try {
      // Add player to battle
      await updateDoc(battleRef, {
        players: [...battle.players, {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Anonymous",
          photoURL: currentUser.photoURL || "",
          score: 0,
          rank: "Bronze",
          status: "waiting"
        }]
      });

      // Start countdown if enough players
      if (battle.players.length + 1 >= 2) {
        await updateDoc(battleRef, {
          status: "countdown",
          countdownStart: serverTimestamp()
        });
      }

      toast.success("Joined battle successfully! Game starting soon...");
    } catch (error) {
      toast.error("Failed to join battle. Please try again.");
      console.error("Error joining battle:", error);
    }
  };

  // Add countdown effect
  useEffect(() => {
    if (currentGame?.status === "countdown") {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Start the game
            const gameRef = doc(db, "battles", currentGame.id);
            updateDoc(gameRef, {
              status: "inProgress",
              startTime: serverTimestamp()
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentGame?.status, currentGame?.id]);

  // Update battle subscription to handle countdown
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Subscribe to current game
    const gamesRef = collection(db, "battles");
    const q = query(
      gamesRef,
      where("players", "array-contains", currentUser.uid),
      where("status", "in", ["countdown", "inProgress", "finished"]),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const gameData = snapshot.docs[0].data() as BattleGame;
        setCurrentGame({
          ...gameData,
          id: snapshot.docs[0].id,
          startTime: gameData.startTime instanceof Timestamp ? gameData.startTime.toDate() : gameData.startTime,
          endTime: gameData.endTime instanceof Timestamp ? gameData.endTime.toDate() : gameData.endTime,
          countdownStart: gameData.countdownStart instanceof Timestamp ? gameData.countdownStart.toDate() : gameData.countdownStart
        });
        
        if (gameData.status === "countdown") {
          setGameStatus("countdown");
          if (gameData.countdownStart) {
            const elapsed = (Date.now() - gameData.countdownStart.getTime()) / 1000;
            setCountdown(Math.max(0, 15 - Math.floor(elapsed)));
          } else {
            setCountdown(15);
          }
        } else if (gameData.status === "inProgress") {
          setGameStatus("playing");
          if (gameData.startTime) {
            const elapsed = (Date.now() - gameData.startTime.getTime()) / 1000;
            const timeLimit = GAME_MODES[gameData.mode].timeLimit;
            setTimeLeft(Math.max(0, timeLimit - elapsed));
          }
        } else if (gameData.status === "finished") {
          setGameStatus("results");
        }
      } else {
        setCurrentGame(null);
        setGameStatus("lobby");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentGame || gameStatus !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 1);
        if (newTime === 0) {
          handleTimeUp();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentGame, gameStatus]);

  const handleTimeUp = async () => {
    if (!currentGame || !currentUser) return;

    // Update player status
    const gameRef = doc(db, "battles", currentGame.id);
    await updateDoc(gameRef, {
      players: currentGame.players.map(player => 
        player.uid === currentUser.uid
          ? { ...player, status: 'submitted', submissionTime: serverTimestamp() }
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
        endTime: serverTimestamp()
      });
    }
  };

  const handleSubmit = async () => {
    if (!currentGame || !currentUser) return;

    // Validate submission
    const isCorrect = validateSubmission(userCode, currentGame.challenge.expectedOutput);
    const submissionTime = new Date();
    const timeBonus = Math.floor((GAME_MODES[currentGame.mode].timeLimit - timeLeft) * 0.5);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/5 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-full transform -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <PageNavigation />

        {gameStatus === "lobby" ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Battle Royale</h1>
              <p className="text-xl text-muted-foreground">
                Test your skills against other developers in real-time coding battles!
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(GAME_MODES) as (keyof typeof GAME_MODES)[]).map((mode) => (
                <Card
                  key={mode}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    activeMode === mode && "border-primary"
                  )}
                  onClick={() => setActiveMode(mode)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={cn("p-2 rounded-lg", GAME_MODES[mode].color)}>
                        {React.createElement(GAME_MODES[mode].icon, { className: "h-6 w-6" })}
                      </div>
                      {activeMode === mode && (
                        <Badge variant="outline">Selected</Badge>
                      )}
                    </div>
                    <CardTitle>{GAME_MODES[mode].name}</CardTitle>
                    <CardDescription>
                      {GAME_MODES[mode].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full"
                      onClick={() => createBattle(mode)}
                    >
                      Create Battle
                    </Button>
                    {availableBattles.filter(b => b.mode === mode).length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Available Battles:</p>
                        {availableBattles
                          .filter(b => b.mode === mode)
                          .map(battle => (
                            <div
                              key={battle.id}
                              className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                            >
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{battle.players.length}/4 players</span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => joinBattle(battle.id)}
                              >
                                Join
                              </Button>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : gameStatus === "countdown" && currentGame ? (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center space-y-8 p-8 rounded-lg bg-card border shadow-lg max-w-md w-full">
              <h2 className="text-4xl font-bold">Game Starting In</h2>
              <div className="text-8xl font-bold text-primary animate-pulse">{countdown}</div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Players</h3>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {currentGame.players.map(player => (
                    <div key={player.uid} className="flex flex-col items-center">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={player.photoURL} />
                        <AvatarFallback>{player.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm mt-2 font-medium">{player.displayName}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-muted-foreground">
                Waiting for more players to join...
              </div>
            </div>
          </div>
        ) : gameStatus === "playing" && currentGame ? (
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentGame.challenge.title}</CardTitle>
                    <CardDescription>
                      {currentGame.challenge.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
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
                      className="w-full h-[400px] font-mono p-4 bg-muted/50 rounded-lg"
                      placeholder="Write your code here..."
                    />
                  </div>
                  <Button
                    className="w-full"
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
                        className="flex items-center gap-4"
                      >
                        <Avatar>
                          <AvatarImage src={player.photoURL} />
                          <AvatarFallback>
                            {player.displayName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Players</span>
                      </div>
                      <span className="font-bold">
                        {currentGame.players.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : gameStatus === "results" && currentGame ? (
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <CardTitle>Battle Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Winner</h2>
                  {currentGame.winner && (
                    <div className="inline-block">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
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
                        {player.correct !== undefined && (
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
        ) : null}
      </div>
    </div>
  );
};

export default BattleRoyale; 