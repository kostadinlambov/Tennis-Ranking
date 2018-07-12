import React ,{ Component} from 'react';
import { Redirect } from 'react-router-dom'

const LoggedInView = (props) => {
    const rankingPicProps = {
        src: 'https://www.grigor-dimitrov.com/pic/news/grigor-dimitrov-number3-2017-large.jpg',
        alt: 'ATP World Tour Final Picture',
        width: '200px'
    }

    return (
        < div >
            <h1>Explore our Tennis World</h1>
            <img
                src={rankingPicProps.src}
                alt={rankingPicProps.alt}
                wdth={rankingPicProps.width}
            />

        </div >
    )
}
export default LoggedInView;