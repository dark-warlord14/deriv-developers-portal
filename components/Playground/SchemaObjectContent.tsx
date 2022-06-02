import { useState } from 'react';
import RecursiveProperties from './RecursiveProperties';
import SchemaDescription from './SchemaDescription';
import styles from "./Schema.module.scss";

// Header component

const SchemaBodyHeader = ({ key_value, type, defaultValue, pattern, examples, enum: _enum, title, is_open_object, setIsOpenObject }: any) => {
    return (
        <div className={`${styles.schemaBodyHeader}${type === "object" ? ` ${styles.schemaObjectHeader}` : ''}`}>
                <div className={styles.schemaBodyType}>
                    <div className={styles.enumFlex}>
                        <p><strong>{key_value}</strong></p>
                        {type && type !== "object" && typeof (type) !== 'object' &&
                            <span className={styles.enumType} style={type === "number" ? { color: "#8181cc" } : {}}>
                                {type}
                            </span>
                        }
                        {type === "object" || type === "array" ?
                            <>
                                <div className={styles.schemaObjectContent}>
                                    <div>
                                        <button onClick={() => setIsOpenObject(!is_open_object)}>{title ? key_value : "object"}</button>
                                    </div>
                                </div>
                            </>
                            :
                            <></>
                        }
                        {_enum &&
                            <>
                                <span className={styles.enumLabel}>
                                    {_enum.length > 1 ? "enum" : "constant"}
                                </span> {' '}
                                <>{_enum.map((el: string, i: number) =>
                                    <div
                                        className={`${styles.schemaCode} ${styles.schemaEnums}`}
                                        key={i}
                                    >
                                        {el}
                                    </div>)}
                                </>
                            </>
                        }
                        {pattern &&
                            <div className={styles.schemaRegexContainer}>
                                <div className={styles.schemaPatternType}>{type}</div>
                                <div className={styles.schemaBodyPattern}>{pattern}</div>
                            </div>
                        }
                        {defaultValue &&
                            <div className={styles.defaultValue}>
                                <span className={styles.defaultValueLabel}>default: </span>
                                <span className={styles.schemaDefaultValue}>{defaultValue}</span>
                            </div>
                        }
                        {/* take examples and map it to div elements with class styles.defaultValue */}
                        {examples &&
                            examples.map((el: string, i: number) => {
                                return (
                                    <div className={styles.defaultValue} key={i}>
                                        <span className={styles.defaultValueLabel}>example: </span>
                                        <span className={styles.schemaDefaultValue}>{el}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
    )
}

export default function SchemaObjectContent({ key_value, properties }) {
    const [is_open_object, setIsOpenObject] = useState(false);
    const { type, description, default: defaultValue, pattern, examples, enum: _enum, title } = properties[key_value];
    const value = properties[key_value];

    return (
        <div className={styles.schemaBodySignature} >
            {/* Header */}
            <SchemaBodyHeader
                key_value={key_value}
                type={type}
                defaultValue={defaultValue}
                pattern={pattern}
                examples={examples}
                enum={_enum}
                title={title}
                is_open_object={is_open_object}
                setIsOpenObject={setIsOpenObject}
            />
            {/* Description */}
            <SchemaDescription
                description={description}
            />
            {/* RecursiveProperties */}
            <RecursiveProperties is_open={is_open_object} properties={value.properties || value?.items?.properties} value={value} />
        </div>
    )
}
