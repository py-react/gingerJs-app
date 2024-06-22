import React from 'react'

function ErrorExample() {
  throw new Error("From Inside a component")
  return (
    <div>ErrorExample</div>
  )
}

export default ErrorExample