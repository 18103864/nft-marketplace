import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LAMPORTS_PER_SOL = 1_000_000_000

export function lamportsToSol(lamports: number) {
  return Math.round((lamports / LAMPORTS_PER_SOL) * 1e4) / 1e4
}

export function solToLamports(sol: number) {
  return Math.floor(sol * LAMPORTS_PER_SOL)
}
