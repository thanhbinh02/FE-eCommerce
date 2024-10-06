import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PreformatText: FC<Props> = ({ children }) => {
  return <pre className="font-sans m-0">{children}</pre>;
};

export default PreformatText;
