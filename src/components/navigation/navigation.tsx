import styles from './navigation.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useRouter} from "next/router";
import Image from "next/image";
import React from "react";
import {BsFacebook, BsWhatsapp} from 'react-icons/bs'
import {useAppContext} from "@/context/context";

interface NavProps {
    list: { name: string, link: string }[] | [],
    imageLogo: string,
    children: any
}

function Navigation(props: NavProps) {
    const router = useRouter()
    const ctx = useAppContext()

    return (
        <Navbar bg="light" expand="sm" fixed={'top'}>
            <Container>
                <Navbar.Brand href="/">
                    <Image className={styles.logo} alt='logo' src='/logo.svg' width={100} height={50}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={router.asPath} as={"ul"} collapseOnSelect={true}>
                        {props.list.map(item => (
                            <Nav.Item key={item.link} as={"li"}>
                                <Nav.Link href={item.link}>{item.name}</Nav.Link>
                            </Nav.Item>
                        ))}
                        <Nav.Item as={"li"}>
                            <Nav.Link href={ctx.whatsAppUrl} target={'_blank'}><BsWhatsapp/> ווצאפ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as={"li"}>
                            <Nav.Link href={ctx.facebookUrl} target={'_blank'}><BsFacebook/> פייסבוק</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                {props.children}
            </Container>
        </Navbar>
    );
}

export default Navigation;