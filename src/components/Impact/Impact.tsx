import React from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { experiences } from '../../data/experience';

interface MetricCardProps {
  before: string;
  after: string;
  description: string;
  company: string;
}

const MetricCard: React.FC<MetricCardProps> = React.memo(({ before, after, description, company }) => {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.3 });

  // Parse numbers for animation
  const beforeNumber = parseInt(before.replace(/[^0-9]/g, '')) || 0;
  const afterNumber = parseInt(after.replace(/[^0-9]/g, '')) || 0;

  // Determine animation direction and type
  const isCountDown = beforeNumber > afterNumber;
  const hasPlus = after.startsWith('+');
  const isPercentage = after.includes('%');
  const isDays = after.includes('day');

  // Use single animated counter with proper start/end values
  const animatedValue = useAnimatedCounter(
    isCountDown ? beforeNumber : (hasPlus ? 0 : afterNumber),
    isCountDown ? afterNumber : (hasPlus ? afterNumber : afterNumber),
    { duration: 1500, isActive: isIntersecting }
  );

  // Format the animated value based on the original format
  const getFormattedAfter = () => {
    if (!isIntersecting) return after;

    const value = animatedValue;

    // Format based on type
    if (hasPlus && isPercentage) {
      return `+${value}%`;
    }
    if (isPercentage) {
      return `${value}%`;
    }
    if (isDays) {
      return value === 1 ? '1 day' : `${value} days`;
    }

    // Handle other number formats (like "1M+")
    if (after.includes('M')) {
      return value === 1 ? '1M+' : after;
    }

    return after;
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`bg-white rounded-xl shadow-lg p-8 transform transition-all duration-700 ${
        isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="text-xs text-chaos-blue uppercase tracking-wider mb-4">{company}</div>

      <div className="flex items-center justify-between mb-6">
        {/* Before */}
        <div className="text-center">
          <div className="text-3xl font-bold text-calm-gray line-through opacity-50">
            {before}
          </div>
          <div className="text-sm text-calm-gray mt-1">Before</div>
        </div>

        {/* Arrow */}
        <div className="px-4">
          <svg className="w-8 h-8 text-chaos-amber" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </div>

        {/* After */}
        <div className="text-center">
          <div className="text-3xl font-bold text-chaos-purple">
            {getFormattedAfter()}
          </div>
          <div className="text-sm text-calm-gray mt-1">After</div>
        </div>
      </div>

      <div className="text-center text-calm-dark font-medium">
        {description}
      </div>
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

const Impact: React.FC = () => {
  const metrics = experiences
    .filter(exp => exp.keyMetric)
    .map(exp => ({ ...exp.keyMetric!, company: exp.company }));

  return (
    <section id="impact" className="py-20 px-6 bg-gradient-to-b from-white to-calm-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-calm-dark mb-4">
            Transforming Chaos into Calm
          </h2>
          <p className="text-lg text-calm-gray max-w-2xl mx-auto">
            Real impact from real projects.
            <br />
            Here's how I've helped companies improve their systems and processes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              before={metric.before}
              after={metric.after}
              description={metric.description}
              company={metric.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;