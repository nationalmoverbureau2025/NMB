export const Spinner = ({ text }: { text?: string }) => (
  <div className="text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
    {text ? (
      <p className="mt-4 text-gray-600">Loading comprehensive report...</p>
    ) : null}
  </div>
)
