import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const AriaLiveRegion = ({ children }: Props) => {
    
    return (
        <div data-testid={"aria-live"} className="sr-only" aria-live="polite" aria-atomic>
            {children}
        </div>
    )
}

export default AriaLiveRegion;