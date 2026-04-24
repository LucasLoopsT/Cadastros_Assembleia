/** Ampliação usada por @types/express v5+ (`Request` extends `Express.Request`). */
declare global {
  namespace Express {
    interface Request {
      /** Preenchido por `authMiddleware` após validar o JWT. */
      admId?: string;
    }
  }
}

export {};
