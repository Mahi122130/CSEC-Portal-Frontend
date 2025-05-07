"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const codeSnippets = [
  `const innovate = () => {\n  return "Create something amazing";\n}`,
  `function collaborate() {\n  return "Build together";\n}`,
  `async function learn() {\n  return await knowledge();\n}`,
  `class Developer {\n  constructor() {\n    this.skills = [];\n  }\n}`
];

const techIcons = [
  "🖥️", "💻", "📱", "🔌", "🌐", "🧠", "⚡", "🔒", 
  "📊", "🧩", "🔧", "🚀", "📦", "🤖", "🛠️", "📟"
];

export default function Home() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: [0, 1, 0],
      y: [20, 0, -20],
      transition: { duration: 3, repeat: Infinity }
    });
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {techIcons.map((icon, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360
            }}
            animate={{
              x: [null, (Math.random() - 0.5) * 100],
              y: [null, (Math.random() - 0.5) * 100],
              rotate: [null, Math.random() * 360],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute text-2xl opacity-20"
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-end items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-lg hover:shadow-cyan-400/30 transition-all duration-300">
                Login
              </button>
            </Link>
          </motion.div>
        </motion.header>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                CSEC LAB Portal
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Join a community of passionate developers building the future, one line of code at a time.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
            </motion.div>
          </motion.div>

          {/* Animated Code Window */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 max-w-2xl"
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-gray-400">editor.js</div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={currentSnippet}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="whitespace-pre-wrap"
                  >
                    <code className="text-cyan-400">{codeSnippets[currentSnippet]}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {[
            {
              title: "Real-time Collaboration",
              desc: "Code together in real-time with our pair programming tools",
              icon: "👨‍💻👩‍💻"
            },
            {
              title: "Learn & Grow",
              desc: "Access our library of tutorials and coding challenges",
              icon: "📚"
            },
            {
              title: "Build Your Network",
              desc: "Connect with CSEC Lab members",
              icon: "🌍"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to level up your coding skills?</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href="/login">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300">
                Login
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}