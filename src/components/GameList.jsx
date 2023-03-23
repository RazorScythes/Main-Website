import { Card, TextWithLines } from './index'
import { game_list } from '../constants';

import styles from "../style";

const GameList = () => {
    return (
        <div>
            <div className='container mx-auto flex-wrap md:px-10 px-2'>
                <TextWithLines text="Played Games" />
            </div>
            <section className={`container mx-auto grid md:grid-cols-4 ss:grid-cols-2 grid-cols-1 gap-5 place-content-start  sm:mb-20 mb-6 py-4 md:px-9`}>
                {
                    game_list.map((game, index) => {
                        return (
                            <Card
                                key={index}
                                image={game.image}
                                title={game.title}
                                link={game.link}
                            />
                        )
                    })
                }
            </section>
        </div>
    );
}

export default GameList