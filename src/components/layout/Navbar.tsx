import { ReactNode } from "react";

type Props = {
    children: ReactNode,
}

const Navbar = ({ children }: Props) => {

    return (
        <nav className="flex flex-wrap w-full items-center justify-between sticky top-0 right-0 gap-5 pb-5">
            {children}
        </nav>
    );
}

export default Navbar;