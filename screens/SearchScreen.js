import React, { useState, useEffect } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
export default function SearchScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const { FS, fall, spring, lunchClass, requirements, year, Class, number } =
    route.params;
  const classDict = require("../classDict.json");

  useEffect(() => {
    setFilteredDataSource(Object.keys(classDict));
    setMasterDataSource(Object.keys(classDict));
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item ? item.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    const classDict = require("../classDict.json");
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() =>
          navigation.navigate("Description", {
            FS: FS,
            name: item,
            GPA: classDict[item].GPA,
            Length: classDict[item].Length,
            Credits: classDict[item].Credits,
            Description: classDict[item].Description,
            Prerequisites: classDict[item].Prerequisites,
            Notes: classDict[item].Notes,
            subject: classDict[item].Subject,
            fall: fall,
            spring: spring,
            time: null,
            lunchClass: lunchClass,
            requirements: requirements,
            year: year,
            Class: Class,
            number: number,
            inSearchMode: true,
          })
        }
      >
        {item.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#d1d1d1" }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search Class"
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d1d1d1",
    paddingBottom: 50,
  },
  itemStyle: {
    fontSize: 15,
    padding: 30,
    fontWeight: "bold",
  },
});
