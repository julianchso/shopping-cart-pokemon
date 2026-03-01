import '../css/app.css';
import pokeStoreLogo from '../media/pokeStoreLogo.png';

export default function Home() {
  return (
    <div id='home' className='section'>
      <div className='home__container'>
        <img src={pokeStoreLogo} alt='pokeStoreLogo' id='home__pokestore--logo' />

        <h2>Gotta catch &apos;em all</h2>
        <h3>
          Here you will find a selection of items to help you on your journey to become the very
          best.
        </h3>
      </div>
    </div>
  );
}
