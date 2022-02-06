const {registerBlockType} = wp.blocks;
const {__} = wp.i18n;
const {
    useBlockProps,
    RichText,
    MediaPlaceholder,
    MediaUpload,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings
} = wp.blockEditor;
const {Component} = wp.element;
const {CustomSelectControl, ToggleControl, Button, PanelBody, PanelRow} = wp.components;

const backgroundSizes = [
    {
        key: 'initial',
        name: __('Initial', 'vanrossumdev-blocks')
    },
    {
        key: 'cover',
        name: __('Cover', 'vanrossumdev-blocks')
    },
    {
        key: 'contain',
        name: __('Contain', 'vanrossumdev-blocks')
    }
];

const backgroundVerticalPositions = [
    {
        key: 'center',
        name: __('Center', 'vanrossumdev-blocks')
    },
    {
        key: 'top',
        name: __('Top', 'vanrossumdev-blocks')
    },
    {
        key: 'bottom',
        name: __('Bottom', 'vanrossumdev-blocks')
    }
];

const backgroundHorizontalPositions = [
    {
        key: 'center',
        name: __('Center', 'vanrossumdev-blocks')
    },
    {
        key: 'left',
        name: __('Left', 'vanrossumdev-blocks')
    },
    {
        key: 'right',
        name: __('Right', 'vanrossumdev-blocks')
    }
];

registerBlockType(
    'vanrossumdev-blocks/background-image-block',
    {
        title: __('Background image', 'vanrossumdev-blocks'),
        icon: 'format-image',
        category: 'media',
        description: __('Create a block with a background image.', 'vanrossumdev-blocks'),

        supports: {
            align: true
        },

        attributes: {
            containerize: {
                type: 'boolean',
                default: false
            },
            parallax: {
                type: 'boolean',
                default: false
            },
            repeat: {
                type: 'boolean',
                default: false
            },
            backgroundColor: {
                type: 'string',
                default: 'transparent'
            },
            backgroundSize: {
                type: 'string',
                default: 'initial'
            },
            horizontalBackgroundPosition: {
                type: 'string',
                default: 'center'
            },
            verticalBackgroundPosition: {
                type: 'string',
                default: 'center'
            },
            imageUrl: {
                attribute: 'src'
            },
        },

        edit(props) {
            let {attributes, setAttributes} = props

            const toggleImagePlaceholder = (openEvent) => {
                if (attributes.imageUrl) {
                    return [
                        <PanelRow>
                            <Button
                                variant="secondary"
                                isSmall
                                onClick={() =>
                                    setAttributes({
                                        imageUrl: undefined
                                    })
                                }
                            >
                                {__('Clear Media')}
                            </Button>
                        </PanelRow>
                    ];
                } else {
                    return (
                        <MediaPlaceholder
                            onSelect={media => {
                                setAttributes({imageUrl: media.url});
                            }}
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{title: 'Upload'}}
                        >
                        </MediaPlaceholder>
                    );
                }
            };


            function setBackgroundColor(value) {
                setAttributes({backgroundColor: value});
            }

            return [
                <InspectorControls>
                    <div>
                        <PanelBody title={__('Media')}>

                            <PanelRow>
                                <MediaUpload
                                    onSelect={media => {
                                        setAttributes({imageUrl: media.url});
                                    }}
                                    type="image"
                                    value={attributes.imageID}
                                    render={({open}) => toggleImagePlaceholder(open)}
                                />
                            </PanelRow>
                        </PanelBody>

                        <PanelBody title={__('Options')}>
                            <PanelRow>
                                <ToggleControl
                                    label="Repeat"
                                    checked={attributes.repeat}
                                    onChange={value => {
                                        setAttributes({repeat: value});
                                    }}
                                />
                            </PanelRow>

                            <PanelRow>
                                <ToggleControl
                                    label="Parallax"
                                    checked={attributes.parallax}
                                    onChange={value => {
                                        setAttributes({parallax: value});
                                    }}
                                />
                            </PanelRow>

                            <PanelRow>
                                <ToggleControl
                                    label="Containerize"
                                    checked={attributes.containerize}
                                    onChange={value => {
                                        setAttributes({containerize: value});
                                    }}
                                />
                            </PanelRow>

                            <PanelRow>
                                <CustomSelectControl
                                    label={__('Size', 'vanrossumdev-blocks')}
                                    options={backgroundSizes}
                                    onChange={({selectedItem}) => setAttributes({backgroundSize: selectedItem.key})}
                                    value={backgroundSizes.find((option) => option.key === attributes.backgroundSize)}
                                />
                            </PanelRow>

                            <PanelRow>
                                <CustomSelectControl
                                    label={__('Vertical', 'vanrossumdev-blocks')}
                                    options={backgroundVerticalPositions}
                                    onChange={({selectedItem}) => setAttributes({verticalBackgroundPosition: selectedItem.key})}
                                    value={backgroundVerticalPositions.find((option) => option.key === attributes.verticalBackgroundPosition)}
                                />
                            </PanelRow>

                            <PanelRow>
                                <CustomSelectControl
                                    label={__('Horizontal', 'vanrossumdev-blocks')}
                                    options={backgroundHorizontalPositions}
                                    onChange={({selectedItem}) => setAttributes({horizontalBackgroundPosition: selectedItem.key})}
                                    value={backgroundHorizontalPositions.find((option) => option.key === attributes.horizontalBackgroundPosition)}
                                />
                            </PanelRow>
                        </PanelBody>

                        <PanelColorSettings
                            __experimentalHasMultipleOrigins
                            __experimentalIsRenderedInSidebar
                            title={__('Background color', 'vanrossumdev-blocks')}
                            colorSettings={[
                                {
                                    value: attributes.backgroundColor,
                                    onChange: setBackgroundColor,
                                    label: __('Color'),
                                },
                            ]}
                        ></PanelColorSettings>
                    </div>
                </InspectorControls>,

                <div>
                    <div style={{
                        backgroundImage: `url(` + attributes.imageUrl ?? '' + `)`,
                        backgroundSize: attributes.backgroundSize,
                        backgroundPositionX: attributes.horizontalBackgroundPosition,
                        backgroundPositionY: attributes.verticalBackgroundPosition,
                        backgroundRepeat: attributes.repeat ? 'repeat' : 'no-repeat',
                        backgroundAttachment: attributes.parallax ? 'fixed' : 'initial',
                        backgroundColor: attributes.backgroundColor,
                    }}>
                        <div className={(attributes.containerize ? 'container mx-auto' : null)}>
                            <InnerBlocks template={[
                                [
                                    'core/paragraph',
                                    {
                                        placeholder: __('Start typing here...', 'vanrossumdev-blocks'),
                                    },
                                ],
                            ]}/>
                        </div>
                    </div>
                </div>
            ];
        },

        save({attributes}) {
            const blockProps = useBlockProps.save();

            return (
                <div {...blockProps} style={{
                    backgroundImage: `url(` + (attributes.imageUrl ?? '') + `)`,
                    backgroundSize: attributes.backgroundSize,
                    backgroundPositionX: attributes.horizontalBackgroundPosition,
                    backgroundPositionY: attributes.verticalBackgroundPosition,
                    backgroundRepeat: attributes.repeat ? 'repeat' : 'no-repeat',
                    backgroundAttachment: attributes.parallax ? 'fixed' : 'initial',
                    backgroundColor: attributes.backgroundColor,
                }}>
                    <div className={(attributes.containerize ? 'container mx-auto' : null)}>
                        <InnerBlocks.Content/>
                    </div>
                </div>
            );
        }
    }
);