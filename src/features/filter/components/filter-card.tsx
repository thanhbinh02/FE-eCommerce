import { FC, ReactElement } from "react";

import { Button, Card, Space } from "antd";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { RiFilterOffLine } from "react-icons/ri";
import { useToggle } from "usehooks-ts";

type Props = {
  onReset: () => void;
  children: ReactElement;
  onSubmit: () => void;
};

const FilterCard: FC<Props> = ({ onReset, children, onSubmit }) => {
  const [isExpand, toggleExpand] = useToggle(true);

  return (
    <Card
      title={
        <Space
          onClick={toggleExpand}
          className="text-base cursor-pointer select-none "
        >
          <span>Bộ lọc</span>
          <span>{isExpand ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}</span>
        </Space>
      }
      className={`${!isExpand ? "max-h-[56px]" : ""} overflow-hidden`}
      bordered
      extra={
        <Space>
          <Button
            onClick={onReset}
            className="flex items-center justify-between gap-1"
            icon={<RiFilterOffLine size={18} />}
          >
            Xóa bộ lọc
          </Button>

          <Button
            type="primary"
            className="flex items-center justify-between gap-1"
            onClick={onSubmit}
            icon={<IoMdSearch size={18} />}
          >
            Tìm kiếm
          </Button>
        </Space>
      }
    >
      {children}
    </Card>
  );
};

export default FilterCard;
