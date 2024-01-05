import './../Common.css'
import './GenreComponent.css'

const GenreComponent = ({ showGenres }) => {
  return (
    <div className={`genres-container ${showGenres ? 'show' : ''}`}>
      <div className='header-text'>Genre 1</div>
      <div className='header-text'>Genre 2</div>
      <div className='header-text'>Genre 3</div>
      <div className='header-text'>Genre 4</div>
    </div>
  )
}
export default GenreComponent
