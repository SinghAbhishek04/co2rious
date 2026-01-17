import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Twitter, Linkedin } from 'lucide-react';
import { ACTIVITIES, calculateCO2 } from '../data/activities';
import { formatCO2, generateEquivalents } from '../data/equivalencies';

export default function ShareButton({ activityId, quantity }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const activity = ACTIVITIES[activityId];
  const totalCO2 = calculateCO2(activityId, quantity);
  const formatted = formatCO2(totalCO2);
  const equivalencies = generateEquivalents(totalCO2, 2);

  const unitLabel = quantity === 1 ? activity.unit : activity.unit_plural;

  const shareText = `🌱 ${quantity} ${unitLabel} of ${activity.name.toLowerCase()} = ${formatted.value}${formatted.unit} CO₂

That's like ${equivalencies[0]?.text || 'a lot'}!

Check your carbon footprint at CO₂rious`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {/* Preview */}
              <div className="p-3 bg-slate-50 border-b border-slate-200">
                <p className="text-xs text-slate-600 whitespace-pre-line line-clamp-3">
                  {shareText}
                </p>
              </div>

              {/* Actions */}
              <div className="p-2">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? 'Copied!' : 'Copy to clipboard'}
                </button>

                <button
                  onClick={handleTwitterShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Share on X/Twitter
                </button>

                <button
                  onClick={handleLinkedInShare}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
