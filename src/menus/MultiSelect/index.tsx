import React from "react";
import type { Option, GroupedOption } from "../..";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
    options: Option[] | GroupedOption[];
    isGrouped?: boolean;
    currentItems: Option[];
    onChange: (item: Option) => void;
}

const MultiSelectMenu: React.FC<Props> = ({
    options,
    isGrouped,
    currentItems,
    onChange,
}) => {
    const isSelected = (item: Option) =>
        currentItems.some((elm) => elm.value === item.value);

    const RenderOption = ({ item }: { item: Option }) => (
        <button
            className={`react-select__menu-item`}
            onClick={() => onChange(item)}
        >
            <IoMdCheckmark
                style={{
                    visibility: isSelected(item) ? "visible" : "hidden",
                }}
            />
            <span>{item.label}</span>
        </button>
    );

    if (isGrouped) {
        const groups = options as GroupedOption[];
        const total = groups.reduce((c, g) => c + g.options.length, 0);

        return (
            <div className="react-select__menu">
                {total > 0 ? (
                    groups.map((group, idx) => (
                        <React.Fragment key={idx}>
                            <div className="react-select__menu-group-label">
                                {group.label}
                            </div>
                            {group.options.map((item, idx2) => (
                                <RenderOption key={idx2} item={item} />
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
    }

    const flatOptions = options as Option[];
    return (
        <div className="react-select__menu">
            {flatOptions.length > 0 ? (
                flatOptions.map((item, idx) => (
                    <RenderOption key={idx} item={item} />
                ))
            ) : (
                <div className="react-select__no-item">
                    No options to Select
                </div>
            )}
        </div>
    );
};

export default MultiSelectMenu;
