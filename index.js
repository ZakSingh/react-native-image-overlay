import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ViewPropTypes,
  Animated
} from "react-native";

const { width } = Dimensions.get("window");
const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

export default class ImageOverlay extends Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);
  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
  };

  render() {
    const {
      blurRadius,
      children,
      containerStyle,
      contentPosition,
      height,
      overlayAlpha,
      overlayColor,
      rounded,
      source,
      title,
      titleStyle,
      thumbnailSource,
      ...props
    } = this.props;

    let justifyContent;
    if (contentPosition == "top") {
      justifyContent = "flex-start";
    } else if (contentPosition == "bottom") {
      justifyContent = "flex-end";
    } else if (contentPosition == "center") {
      justifyContent = "center";
    }

    return (
      <View>
        <AnimatedImage
          source={thumbnailSource}
          style={[
            styles.image,
            {
              borderRadius: rounded,
              height: height,
              justifyContent: justifyContent,
              opacity: this.thumbnailAnimated
            },
            containerStyle
          ]}
          blurRadius={1}
          resizeMode="cover"
          onLoad={this.handleThumbnailLoad}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: overlayColor,
              opacity: overlayAlpha / 2
            }}
          />
          {!children && title && (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )}
          {children}
        </AnimatedImage>
        <AnimatedImage
          source={source}
          style={[
            styles.image,
            {
              borderRadius: rounded,
              height: height,
              justifyContent: justifyContent,
              opacity: this.imageAnimated
            },
            containerStyle,
            styles.imageOverlay
          ]}
          blurRadius={blurRadius}
          resizeMode="cover"
          onLoad={this.onImageLoad}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: overlayColor,
              opacity: overlayAlpha / 2
            }}
          />
          {!children && title && (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )}
          {children}
        </AnimatedImage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
    overflow: "hidden",
    alignItems: "center"
  },
  title: {
    margin: 20,
    color: "white",
    textAlign: "center",
    fontSize: 16
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

ImageOverlay.propTypes = {
  rounded: PropTypes.number,
  source: Image.propTypes.source,
  thumbnailSource: Image.propTypes.source,
  height: PropTypes.number,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  overlayColor: PropTypes.string,
  overlayAlpha: PropTypes.number,
  contentPosition: PropTypes.oneOf(["top", "center", "bottom"]),
  containerStyle: ViewPropTypes.style,
  blurRadius: PropTypes.number,
  children: PropTypes.element
};

ImageOverlay.defaultProps = {
  height: 300,
  overlayColor: "#000000",
  overlayAlpha: 0.5,
  contentPosition: "center"
};
