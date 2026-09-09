"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const NavbarSurfaceContext = createContext<HTMLElement | null>(null);

export function useNavbarSurface() {
    return useContext(NavbarSurfaceContext);
}

type NavbarSurfaceProps = {
    children: ReactNode;
};

function NavbarSurface({ children }: NavbarSurfaceProps) {
    const [surface, setSurface] = useState<HTMLElement | null>(null);

    return (
        <NavbarSurfaceContext.Provider value={surface}>
            <header
                ref={setSurface}
                className="container relative overflow-visible"
                dir="ltr"
            >
                {children}
            </header>
        </NavbarSurfaceContext.Provider>
    );
}

export default NavbarSurface;
