import { Spinner } from '../Spinner'

export const ReportLoading = ({text}: {text: string}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Spinner text={text} />
  </div>
)
