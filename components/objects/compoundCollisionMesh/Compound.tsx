// @ts-nocheck
import React, { Suspense } from "react";
import { useCylinder } from '@react-three/cannon'
import Loader from '../Loader';

export default function Compound(props) {
    const nodes = Loader(props.url)

    let object = null
    let counter = 0

}