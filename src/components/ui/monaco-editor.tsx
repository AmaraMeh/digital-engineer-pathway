import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  height: string;
  defaultLanguage: string;
  value: string;
  onChange: (value: string | undefined) => void;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}

export const MonacoEditor = ({
  height,
  defaultLanguage,
  value,
  onChange,
  options = {}
}: MonacoEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (monacoEl.current) {
      editorRef.current = monaco.editor.create(monacoEl.current, {
        value,
        language: defaultLanguage,
        theme: 'vs-dark',
        automaticLayout: true,
        ...options
      });

      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current?.getValue());
      });
    }

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={monacoEl} style={{ height }} />;
}; 