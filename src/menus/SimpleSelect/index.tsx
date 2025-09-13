import React from "react";
import type { Option } from "../..";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
    options: Option[];
    currentItem: Option | null;
    menuStyle?: React.CSSProperties;
    onChange: (item: Option) => void;
}

const SimpleSelectMenu: React.FC<Props> = ({
    options,
    currentItem,
    menuStyle = {},
    onChange,
}) => {
    return (
        <div className="react-select__menu" style={menuStyle ?? {}}>
            {options.length > 0 ? (
                options.map((item, idx) => (
                    <button
                        key={idx}
                        className={`react-select__menu-item`}
                        onClick={() => onChange(item)}
                        disabled={currentItem?.value === item.value}
                    >
                        <IoMdCheckmark
                            style={{
                                visibility:
                                    currentItem?.value === item.value
                                        ? "visible"
                                        : "hidden",
                            }}
                        />

                        <span>{item.label}</span>
                    </button>
                ))
            ) : (
                <div className="react-select__no-item">
                    No options to Select
                </div>
            )}
        </div>
    );
};

export default SimpleSelectMenu;
