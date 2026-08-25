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
                className="container relative overflow-visible bg-white shadow-[0_0_15px_rgba(0,0,0,0.12)] md:mt-4 md:rounded-full"
                dir="ltr"
            >
                {children}
            </header>
        </NavbarSurfaceContext.Provider>
    );
}

export default NavbarSurface;
