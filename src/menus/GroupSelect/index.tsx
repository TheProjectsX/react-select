import React from "react";
import type { Option, GroupedOption } from "../..";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
    groups: GroupedOption[];
    currentItem: Option | null;
    menuStyle?: React.CSSProperties;
    onChange: (item: Option) => void;
}

const GroupSelectMenu: React.FC<Props> = ({
    groups,
    currentItem,
    menuStyle = {},
    onChange,
}) => {
    const total = groups.reduce((c, g) => c + g.options.length, 0);

    return (
        <div className="react-select__menu" style={menuStyle ?? {}}>
            {total > 0 ? (
                groups.map((group, idx) => (
                    <React.Fragment key={idx}>
                        <div className="react-select__menu-group-label">
                            {group.label}
                        </div>
                        {group.options.map((item, idx2) => (
                            <button
                                key={idx2}
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
                        ))}
                    </React.Fragment>
                ))
            ) : (
                <div className="react-select__no-item">
                    No options to Select
                </div>
            )}
        </div>
    );
};

export default GroupSelectMenu;
