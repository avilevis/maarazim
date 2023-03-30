import React from 'react';

import styles from '@/components/policy/policy.module.scss'

interface PolicyProps {
    businessName: string,
    header: string,
    headerComment: string,
    businessDescription: string,
    paragraphs: { header: string, content: string[] }[]
}

function Policy(props: PolicyProps) {
    const inject = (text) => text
        .replaceAll('%1', props.businessName)
        .replaceAll('%2', props.businessDescription)
    const body = props.paragraphs.map((p, index) => (
        <div key={`p${index}`} className={styles.body}>
            <h5>{p.header}</h5>
            {p.content.map((text, contentIndex) =>
                <p key={`content${index}${contentIndex}`}>{inject(text)}</p>)}
        </div>))

    return (
        <div className={styles.policy}>
            <h3>{inject(props.header)}</h3>
            <small>{inject(props.headerComment)}</small>
            {body}
        </div>
    )
}

export default Policy;