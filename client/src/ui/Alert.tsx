interface AlertProps {
  children: React.ReactNode
  className?: string
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={`flex border border-rose-700/30 rounded-lg p-4 mb-5 text-sm text-rose-300 bg-rose-700/10 ${props.className}`}
      role="alert"
    >
      <div className="flex items-center">
        <i className="bi-bi-alert text-rose-300 mr-2"></i>
        {props.children}
      </div>
    </div>
  )
}

export default Alert
