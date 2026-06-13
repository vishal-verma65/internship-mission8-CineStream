import { useState } from 'react'
import { RiSparklingLine, RiSendPlaneLine, RiErrorWarningLine } from 'react-icons/ri'
import useMoodMatcher from '../hooks/useMoodMatcher'

const MoodMatcher = ({ onMatch }) => {
  const [mood, setMood] = useState('')
  const { getMovieFromMood, loading, error } = useMoodMatcher()

  const handleSubmit = async () => {
    if (!mood.trim() || loading) return
    const title = await getMovieFromMood(mood)
    if (title) {
      onMatch(title)
      setMood('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="mood-box">
      <div className="flex items-center gap-2 mb-3">
        <RiSparklingLine size={16} className="text-(--accent)" />
        <span className="text-[0.8rem] font-semibold text-(--text-primary)">Mood Matcher</span>
        <span className="text-[0.65rem] bg-(--accent-dim) text-(--accent) rounded-sm px-1.5 py-px font-semibold tracking-[0.04em]">
          AI
        </span>
      </div>

      <p className="text-[0.75rem] text-(--text-secondary) mb-2.5 leading-normal">
        Describe how you're feeling and we'll find the perfect movie.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g. "feeling nostalgic and want to cry"'
          disabled={loading}
          className="flex-1 bg-(--bg-primary) border border-(--border) rounded-lg py-2 px-3 text-[0.8rem] text-(--text-primary) outline-none transition-colors focus:border-(--accent)"
        />

        <button
          onClick={handleSubmit}
          disabled={!mood.trim() || loading}
          className={`rounded-lg py-2 px-3.5 flex items-center gap-1.5 text-[0.8rem] font-semibold transition-all whitespace-nowrap ${mood.trim() && !loading ? 'bg-(--accent) text-black cursor-pointer' : 'bg-(--bg-secondary) text-(--text-muted) cursor-not-allowed'}`}
        >
          {loading ? (
            <span className="spinner w-3.5 h-3.5 border-2" />
          ) : (
            <RiSendPlaneLine size={14} />
          )}
          {loading ? 'Thinking…' : 'Match'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-(--red) text-[0.72rem]">
          <RiErrorWarningLine size={13} />
          {error}
        </div>
      )}
    </div>
  )
}

export default MoodMatcher