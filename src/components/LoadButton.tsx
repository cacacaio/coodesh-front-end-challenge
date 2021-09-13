import { Button, CircularProgress } from '@material-ui/core'
import { FormEvent } from 'react'

type Props = {
  isLoading: boolean
  handleLoad: (e: FormEvent) => Promise<void>
}

export default function LoadButton({ isLoading, handleLoad }: Props) {
  return isLoading ? (
    <div className="loading">
      <CircularProgress />
      <span>Loading More...</span>
    </div>
  ) : (
    <div className="loading">
      <Button variant="contained" color="primary" onClick={handleLoad}>
        Load More
      </Button>
    </div>
  )
}
