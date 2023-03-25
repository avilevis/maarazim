import styles from './box-card.module.css'

interface BoxCardProps {
    image: string,
    title: string,
    sub_title: string,
    text: string
}

function BoxCard(props: BoxCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.image_container}>
                <img className={styles.card_image} alt='image' src={props.image}/>
            </div>
            <div className={styles.card_body}>
                <h4 className={styles.title}>{props.title}</h4>
                <h5 className={styles.sub_title}>{props.sub_title}</h5>
                <div className={styles.text}>{props.text}</div>
            </div>
        </div>
    )
}

export default BoxCard;