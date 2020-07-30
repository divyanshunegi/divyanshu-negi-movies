import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Placeholder = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                flexDirection="column"
                alignItems="center">
                <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width - 32}
                    height={Dimensions.get('window').height / 2}
                    borderRadius={20}
                    marginTop={20}
                />
                <SkeletonPlaceholder.Item marginTop={20}>
                    <SkeletonPlaceholder.Item
                        width={Dimensions.get('window').width - 32}
                        height={40}
                        borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={6}
                        width={Dimensions.get('window').width - 64}
                        height={30}
                        borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                        marginTop={6}
                        width={Dimensions.get('window').width - 32}
                        height={40}
                        borderRadius={4}
                    />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};

export default Placeholder;
