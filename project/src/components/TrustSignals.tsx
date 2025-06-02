import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, TrendingUp, Leaf } from 'lucide-react';

const stats = [
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    value: "180%",
    label: "Average ROI Increase",
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    value: "50+",
    label: "Satisfied Clients",
  },
  {
    icon: <Award className="w-6 h-6 text-emerald-400" />,
    value: "15+",
    label: "Industry Awards",
  },
  {
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
    value: "100%",
    label: "Carbon Neutral",
  },
];

const testimonials = [
  {
    quote: "GSI transformed our digital presence while keeping our environmental impact minimal. The ROI has been incredible.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "EcoTech Solutions",
  },
  {
    quote: "Their sustainable marketing approach helped us reduce costs and increase engagement. Truly revolutionary.",
    author: "Michael Rodriguez",
    role: "CEO",
    company: "Green Energy Corp",
  },
];

export default function TrustSignals() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <blockquote className="text-lg text-slate-300 mb-4">"{testimonial.quote}"</blockquote>
            <div>
              <div className="font-semibold text-white">{testimonial.author}</div>
              <div className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}