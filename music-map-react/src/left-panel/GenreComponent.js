import './../Common.css'
import './GenreComponent.css'
import Genre from './Genre'

const GenreComponent = ({ showGenres, setCheckedGenres }) => {
  const handleGenreChange = (genre, isChecked) => {
    if (isChecked) {
      setCheckedGenres(prevGenres => [...prevGenres, genre])
    } else {
      setCheckedGenres(prevGenres => prevGenres.filter(g => g !== genre))
    }
  }

  return (
    <div className={`genres-container ${showGenres ? 'show' : ''}`}>
      <Genre genreName='Deephouse' onGenreChange={handleGenreChange} />
      <Genre genreName='Techno' onGenreChange={handleGenreChange} />
      <Genre genreName='Rap' onGenreChange={handleGenreChange} />
      <Genre genreName='Pop' onGenreChange={handleGenreChange} />
      <Genre genreName='Favorites' onGenreChange={handleGenreChange} />
    </div>
  )
}
export default GenreComponent
