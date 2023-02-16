import React from 'react';
import {} from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { colors } from '@constants';
import Friends from './Friends';
import Blocked from './Blocked';
import Request from './Request';

const tabName = ['Tất cả', 'Lời mời kết bạn', 'Danh sách chặn'];

function ListFriends(props) {
    const [index, setIndex] = React.useState(0);
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                disableIndicator
                variant="default"
                scrollable={true}
                containerStyle={styles.tab}
            >
                {tabName.map((tab) => {
                    return (
                        <Tab.Item
                            key={tab}
                            title={tab}
                            titleStyle={(active) => ({
                                color: active ? colors.text : colors.gray,
                                fontSize: 14,
                                paddingHorizontal: 15,
                            })}
                            containerStyle={{ backgroundColor: undefined }}
                        />
                    );
                })}
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={styles.tavView}>
                    <Friends navigate={navigate} />
                </TabView.Item>
                <TabView.Item style={styles.tavView}>
                    <Request navigate={navigate} />
                </TabView.Item>
                <TabView.Item style={styles.tavView}>
                    <Blocked navigate={navigate} />
                </TabView.Item>
            </TabView>
        </>
    );
}

const styles = {
    tavView: {
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: 10,
    },
    tab: {
        paddingHorizontal: '5%',
        paddingTop: 10,
    },
};

export default ListFriends;
