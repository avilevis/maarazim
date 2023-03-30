import React from 'react'
import Policy from "@/components/policy/policy";
import content from "@/components/policy/policies.json"

export default function PolicyPage() {
    return (
        <Policy {...content}/>
    )
}