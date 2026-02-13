interface Step {
  id: string
  number: number
  label: string
}

const steps: Step[] = [
  { id: 'step_theme', number: 1, label: 'Theme' },
  { id: 'step_details', number: 2, label: 'Details' },
  { id: 'step_photos', number: 3, label: 'Photos' },
  { id: 'step_timeline', number: 4, label: 'Timeline' },
  { id: 'step_generate', number: 5, label: 'Generate' },
]

interface ProgressIndicatorProps {
  currentStep: number
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  isCompleted
                    ? 'bg-primary text-white'
                    : isActive
                    ? 'bg-primary text-white ring-4 ring-primary/20' :'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? '✓' : step.number}
              </div>
              
              {/* Label */}
              <span
                className={`mt-2 text-xs font-semibold transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}