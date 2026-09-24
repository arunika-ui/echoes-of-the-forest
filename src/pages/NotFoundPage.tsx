import { Link } from 'react-router-dom'
import { usePageTitle } from './usePageTitle'

export function NotFoundPage() {
  usePageTitle('Not found')
  return (
    <header className="ph frame notfound">
      <div className="ed">
        <p className="ed__side tiny">404</p>
        <div className="ed__main">
          <h1 className="ph__title">Off the trail</h1>
          <p className="ph__text">
            This page doesn’t exist.{' '}
            <Link to="/" className="text-link">
              Return to the start →
            </Link>
          </p>
        </div>
      </div>
    </header>
  )
}
