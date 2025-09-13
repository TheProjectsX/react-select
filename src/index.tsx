import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import MultiSelectMenu from "./menus/MultiSelect";
import GroupSelectMenu from "./menus/GroupSelect";
import SimpleSelectMenu from "./menus/SimpleSelect";

export type Option = { label: string; value: string | number };
export type GroupedOption = { label: string; options: Option[] };

type ReactSelectProps = {
    options: Option[] | GroupedOption[];
    defaultValue?: Option | Option[] | null;
    placeholder?: string;
    name?: string;
    isClearable?: boolean;
    isSearchable?: boolean;
    isDisabled?: boolean;
    isGrouped?: boolean;
    isMulti?: boolean;
    parentStyle?: React.CSSProperties;
    menuStyle?: React.CSSProperties;
    onChange?: (item: Option | Option[] | null) => void;
    onMenuStatusChange?: (status: boolean) => void;
    onSearch?: (value: string) => void;
};

const ReactSelect: React.FC<ReactSelectProps> = ({
    options,
    defaultValue,
    placeholder = "Select...",
    name = "select",
    isClearable = true,
    isSearchable = true,
    isDisabled = false,
    isGrouped = false,
    isMulti = false,
    parentStyle = {},
    menuStyle = {},
    onChange,
    onMenuStatusChange,
    onSearch,
}) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [menuOpened, setMenuOpened] = useState(false);

    const [currentItem, setCurrentItem] = useState<Option | Option[] | null>(
        isMulti
            ? Array.isArray(defaultValue)
                ? defaultValue
                : []
            : (defaultValue as Option) || null
    );

    const [currentViewingLabel, setCurrentViewingLabel] = useState<string>(
        isMulti
            ? ""
            : defaultValue && "label" in (defaultValue as Option)
            ? (defaultValue as Option).label
            : ""
    );

    const [selectionOptions, setSelectionOptions] = useState<
        Option[] | GroupedOption[]
    >([]);
    const [optionsIsGrouped, setOptionsIsGrouped] =
        useState<boolean>(isGrouped);

    // Type guard
    const isGroup = (item: Option | GroupedOption): item is GroupedOption =>
        "options" in item;

    // Initialize selection options
    useEffect(() => {
        setOptionsIsGrouped(isGrouped);

        if (isGrouped) {
            if (options.every((item) => !isGroup(item))) {
                setSelectionOptions([
                    { label: "Grouped Items", options: options as Option[] },
                ]);
            } else if (options.every(isGroup)) {
                setSelectionOptions(options as GroupedOption[]);
            } else {
                setSelectionOptions([]);
            }
        } else {
            if (options.every(isGroup)) {
                setSelectionOptions(options as GroupedOption[]);
                setOptionsIsGrouped(true);
            } else {
                setSelectionOptions(options as Option[]);
            }
        }
    }, [isGrouped, options]);

    // Handle Document click and close popover
    useEffect(() => {
        const handleWindowClick = (e: MouseEvent) => {
            if (!menuOpened) return;

            const target = e.target as HTMLElement | null;

            if (!target) return;

            const wrapperEl = wrapperRef.current;

            // click outside
            if (
                document.contains(target) &&
                wrapperEl &&
                !wrapperEl.contains(target)
            ) {
                setMenuOpened(false);
            }
            // click inside content on actionable element
        };

        document.addEventListener("click", handleWindowClick);

        return () => {
            document.removeEventListener("click", handleWindowClick);
        };
    }, [menuOpened]);

    // Handlers
    const handleElementChanged = (item: Option) => {
        if (isMulti) {
            if (Array.isArray(currentItem)) {
                const exists = currentItem.some(
                    (elm) => elm.value === item.value
                );
                const newItems = exists
                    ? currentItem.filter((elm) => elm.value !== item.value) // remove if exists
                    : [...currentItem, item]; // add if not exists
                setCurrentItem(newItems);
            } else {
                setCurrentItem([item]);
            }
        } else {
            setCurrentItem(item);
            setCurrentViewingLabel(item.label);
        }
    };

    const handleSearch = (value: string) => {
        setCurrentViewingLabel(value);

        if (value === "") {
            setSelectionOptions(options);
            return;
        }

        if (optionsIsGrouped) {
            setSelectionOptions(
                (options as GroupedOption[]).map((group) => ({
                    ...group,
                    options: group.options.filter((option) =>
                        option.label.toLowerCase().includes(value.toLowerCase())
                    ),
                }))
            );
        } else {
            setSelectionOptions(
                (options as Option[]).filter((item) =>
                    item.label.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const handleClearSelection = () => {
        setCurrentViewingLabel("");
        setCurrentItem(isMulti ? [] : null);
        setSelectionOptions(options);
    };

    // Run the Events
    useEffect(() => {
        setSelectionOptions(options);

        onMenuStatusChange?.(menuOpened);
    }, [menuOpened]);

    useEffect(() => {
        onChange?.(currentItem);
    }, [currentItem]);

    useEffect(() => {
        onSearch?.(currentViewingLabel);
    }, [currentViewingLabel]);

    return (
        <div
            className="react-select"
            style={{ userSelect: "none", ...(parentStyle ?? {}) }}
            ref={wrapperRef}
        >
            <div
                className={`react-select__wrapper`}
                data-disabled={isDisabled}
                tabIndex={0}
            >
                {/* Control */}
                <div className="react-select__control">
                    {/* A Input tag so that if this is under a <form>, it is possible to get the value using form.name.value. Well, of course, only if it's not multi select!
                    It's outside label so that no event is triggered */}
                    <input
                        type="text"
                        name={name}
                        value={
                            !Array.isArray(currentItem) && currentItem
                                ? currentItem.value
                                : ""
                        }
                        data-raw={
                            currentItem
                                ? JSON.stringify(currentItem)
                                : isMulti
                                ? "[]"
                                : "{}"
                        }
                        readOnly
                        hidden
                    />

                    <label
                        onClick={(e) => {
                            setMenuOpened((prev) => !prev);
                            console.log(e.currentTarget, e.target);
                            return;
                            if (!isSearchable) {
                                if (e.currentTarget === e.target) {
                                    setMenuOpened((prev) => !prev);
                                }
                            } else {
                            }
                        }}
                        className={`react-select__control-label${
                            menuOpened
                                ? " react-select__control-label--opened"
                                : ""
                        }`}
                    >
                        {/* Show items for Multi */}
                        {isMulti &&
                            Array.isArray(currentItem) &&
                            currentItem.length > 0 && (
                                <p
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        whiteSpace: "nowrap",
                                        paddingLeft: "8px",
                                    }}
                                >
                                    {currentItem
                                        .map((item) => item.label)
                                        .join(", ").length > 40
                                        ? `${currentItem
                                              .map((item) => item.label)
                                              .join(", ")
                                              .substring(0, 40)}...`
                                        : currentItem
                                              .map((item) => item.label)
                                              .join(", ")}
                                </p>
                            )}
                        <input
                            type="text"
                            name="query"
                            disabled={!isSearchable}
                            placeholder={placeholder}
                            autoComplete="off"
                            spellCheck="false"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className={`react-select__control-input`}
                            value={
                                menuOpened
                                    ? currentViewingLabel
                                    : isMulti
                                    ? ""
                                    : !Array.isArray(currentItem) && currentItem
                                    ? currentItem.label
                                    : ""
                            }
                            onChange={(e) => {
                                setMenuOpened((prev) => (prev ? prev : true));
                                handleSearch(e.target.value);
                            }}
                        />
                        {isClearable &&
                            (currentViewingLabel !== "" ||
                                (isMulti &&
                                    Array.isArray(currentItem) &&
                                    currentItem.length > 0)) && (
                                <button
                                    type="button"
                                    className="react-select__clear-icon-wrapper"
                                    onClick={handleClearSelection}
                                >
                                    <IoClose className="react-select__clear-icon" />
                                </button>
                            )}
                        <button
                            type="button"
                            className="react-select__dropdown-icon-wrapper"
                        >
                            <IoIosArrowDown className="react-select__dropdown-icon" />
                        </button>
                    </label>
                </div>

                {/* Selection Items */}

                {/* ✅ Multi Select takes priority */}
                {menuOpened && isMulti && (
                    <MultiSelectMenu
                        options={selectionOptions}
                        isGrouped={optionsIsGrouped}
                        currentItems={
                            Array.isArray(currentItem) ? currentItem : []
                        }
                        menuStyle={menuStyle}
                        onChange={handleElementChanged}
                    />
                )}

                {/* ✅ Grouped Single Select */}
                {menuOpened && !isMulti && optionsIsGrouped && (
                    <GroupSelectMenu
                        groups={selectionOptions as GroupedOption[]}
                        currentItem={
                            !Array.isArray(currentItem) ? currentItem : null
                        }
                        menuStyle={menuStyle}
                        onChange={(item: Option) => {
                            handleElementChanged(item);
                            setTimeout(() => {
                                setMenuOpened(false);
                            }, 10);
                        }}
                    />
                )}

                {/* ✅ Simple Single Select */}
                {menuOpened && !isMulti && !optionsIsGrouped && (
                    <SimpleSelectMenu
                        options={selectionOptions as Option[]}
                        currentItem={
                            !Array.isArray(currentItem) ? currentItem : null
                        }
                        menuStyle={menuStyle}
                        onChange={(item: Option) => {
                            handleElementChanged(item);
                            setMenuOpened(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ReactSelect;
