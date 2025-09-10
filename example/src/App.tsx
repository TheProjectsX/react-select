import React, { useState, type ChangeEvent } from "react";
import ReactSelect from "@theprojectsx/react-select";

type Option = { label: string; value: string | number };
type GroupedOption = { label: string; options: Option[] };

function App() {
    const consoleElement = (item: Option | Option[] | null) => {
        console.log("Selected Item(s):", item);
    };
    const consoleElementSearch = (value: string) => {
        console.log("Searched Value:", value);
    };
    const consoleMenuOpen = (val: boolean) => {
        console.log("Menu Opened: ", val);
    };

    const simpleOptions: Option[] = [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Date", value: "date" },
        { label: "Elderberry", value: "elderberry" },
        { label: "Fig", value: "fig" },
        { label: "Grape", value: "grape" },
        { label: "Honeydew", value: "honeydew" },
    ];

    const groupedOptions: GroupedOption[] = [
        {
            label: "Fruits",
            options: [
                { label: "Apple", value: "apple" },
                { label: "Banana", value: "banana" },
                { label: "Cherry", value: "cherry" },
                { label: "Date", value: "date" },
            ],
        },
        {
            label: "Vegetables",
            options: [
                { label: "Carrot", value: "carrot" },
                { label: "Broccoli", value: "broccoli" },
                { label: "Spinach", value: "spinach" },
                { label: "Pepper", value: "pepper" },
            ],
        },
        {
            label: "Dairy",
            options: [
                { label: "Milk", value: "milk" },
                { label: "Cheese", value: "cheese" },
                { label: "Yogurt", value: "yogurt" },
                { label: "Butter", value: "butter" },
            ],
        },
    ];

    // Single Select
    const [isClearable_01, setIsClearable_01] = useState<boolean>(true);
    const [isSearchable_01, setIsSearchable_01] = useState<boolean>(true);
    const [isDisabled_01, setIsDisabled_01] = useState<boolean>(false);

    // Multi Select
    const [isClearable_02, setIsClearable_02] = useState<boolean>(true);
    const [isSearchable_02, setIsSearchable_02] = useState<boolean>(true);
    const [isDisabled_02, setIsDisabled_02] = useState<boolean>(false);
    // Grouped Items
    const [isClearable_03, setIsClearable_03] = useState<boolean>(true);
    const [isSearchable_03, setIsSearchable_03] = useState<boolean>(true);
    const [isDisabled_03, setIsDisabled_03] = useState<boolean>(false);

    // Grouped Items Multi Select
    const [isClearable_04, setIsClearable_04] = useState<boolean>(true);
    const [isSearchable_04, setIsSearchable_04] = useState<boolean>(true);
    const [isDisabled_04, setIsDisabled_04] = useState<boolean>(false);

    const Checkbox: React.FC<
        React.PropsWithChildren<{
            checked: boolean;
            onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        }>
    > = ({ children, ...props }) => (
        <label
            style={{
                marginRight: "1em",
                display: "inline-flex",
                gap: "3px",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <input
                type="checkbox"
                {...props}
                style={{ marginRight: "2.5px" }}
            />
            {children}
        </label>
    );

    const changeMode = () => {
        const classList = document.documentElement.classList;
        if (classList.contains("dark")) {
            classList.remove("dark");
        } else {
            classList.add("dark");
        }
    };

    return (
        <main className="main">
            <div
                style={{
                    display: "flex",
                    gap: "18px",
                    marginBottom: "40px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <h1 style={{ textAlign: "center" }}>
                    React Custom Select Component
                </h1>
                <button
                    style={{
                        backgroundColor: "#1E90FF",
                        color: "#FFFFFF",
                        border: "2px solid #1E90FF",
                        borderRadius: "6px",
                        padding: "2px 4px",
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#1C86EE";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#1E90FF";
                    }}
                    onClick={changeMode}
                >
                    Toggle Mode
                </button>
            </div>
            <div className="wrapper">
                {/* Single Select */}
                <div className="custom-select">
                    <h3 className="custom-select-title">Single Select</h3>
                    <ReactSelect
                        options={simpleOptions}
                        defaultValue={null}
                        isClearable={isClearable_01}
                        isSearchable={isSearchable_01}
                        isDisabled={isDisabled_01}
                        onSearch={consoleElementSearch}
                        onMenuStatusChange={consoleMenuOpen}
                        onChange={consoleElement}
                    />
                    <div className="checkboxes">
                        <Checkbox
                            checked={isClearable_01}
                            onChange={() => setIsClearable_01((s) => !s)}
                        >
                            Clearable
                        </Checkbox>
                        <Checkbox
                            checked={isSearchable_01}
                            onChange={() => setIsSearchable_01((s) => !s)}
                        >
                            Searchable
                        </Checkbox>
                        <Checkbox
                            checked={isDisabled_01}
                            onChange={() => setIsDisabled_01((s) => !s)}
                        >
                            Disabled
                        </Checkbox>
                    </div>
                </div>

                {/* Multi Select */}
                <div className="custom-select">
                    <h3 className="custom-select-title">Multi Select</h3>
                    <ReactSelect
                        options={simpleOptions}
                        defaultValue={[simpleOptions[0], simpleOptions[4]]}
                        isClearable={isClearable_02}
                        isSearchable={isSearchable_02}
                        isDisabled={isDisabled_02}
                        isMulti={true}
                        onSearch={consoleElementSearch}
                        onMenuStatusChange={consoleMenuOpen}
                        onChange={consoleElement}
                    />
                    <div className="checkboxes">
                        <Checkbox
                            checked={isClearable_02}
                            onChange={() => setIsClearable_02((s) => !s)}
                        >
                            Clearable
                        </Checkbox>
                        <Checkbox
                            checked={isSearchable_02}
                            onChange={() => setIsSearchable_02((s) => !s)}
                        >
                            Searchable
                        </Checkbox>
                        <Checkbox
                            checked={isDisabled_02}
                            onChange={() => setIsDisabled_02((s) => !s)}
                        >
                            Disabled
                        </Checkbox>
                    </div>
                </div>

                {/* Grouped Items */}
                <div className="custom-select">
                    <h3 className="custom-select-title">Group Items</h3>
                    <ReactSelect
                        options={groupedOptions}
                        defaultValue={groupedOptions[0].options[0]}
                        isClearable={isClearable_03}
                        isSearchable={isSearchable_03}
                        isDisabled={isDisabled_03}
                        isGrouped={true}
                        onSearch={consoleElementSearch}
                        onMenuStatusChange={consoleMenuOpen}
                        onChange={consoleElement}
                    />
                    <div className="checkboxes">
                        <Checkbox
                            checked={isClearable_03}
                            onChange={() => setIsClearable_03((s) => !s)}
                        >
                            Clearable
                        </Checkbox>
                        <Checkbox
                            checked={isSearchable_03}
                            onChange={() => setIsSearchable_03((s) => !s)}
                        >
                            Searchable
                        </Checkbox>
                        <Checkbox
                            checked={isDisabled_03}
                            onChange={() => setIsDisabled_03((s) => !s)}
                        >
                            Disabled
                        </Checkbox>
                    </div>
                </div>

                {/* Grouped Items Multi Select */}
                <div className="custom-select">
                    <h3 className="custom-select-title">
                        Group Items Multi Select
                    </h3>
                    <ReactSelect
                        options={groupedOptions}
                        defaultValue={[groupedOptions[0].options[0]]}
                        isClearable={isClearable_04}
                        isSearchable={isSearchable_04}
                        isDisabled={isDisabled_04}
                        isGrouped={true}
                        isMulti={true}
                        onSearch={consoleElementSearch}
                        onMenuStatusChange={consoleMenuOpen}
                        onChange={consoleElement}
                    />
                    <div className="checkboxes">
                        <Checkbox
                            checked={isClearable_04}
                            onChange={() => setIsClearable_04((s) => !s)}
                        >
                            Clearable
                        </Checkbox>
                        <Checkbox
                            checked={isSearchable_04}
                            onChange={() => setIsSearchable_04((s) => !s)}
                        >
                            Searchable
                        </Checkbox>
                        <Checkbox
                            checked={isDisabled_04}
                            onChange={() => setIsDisabled_04((s) => !s)}
                        >
                            Disabled
                        </Checkbox>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
