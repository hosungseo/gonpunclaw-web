'use client';

import { useRef, useEffect, useState } from 'react';
import { useSpring, useInView, motion } from 'framer-motion';

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <motion.span ref={ref}>
      {display.toLocaleString()}{suffix}
    </motion.span>
  );
}
