import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {actions} from './const';
import {Image} from 'expo-image'

export const defaultActions = [
  actions.keyboard,
  actions.setBold,
  actions.setItalic,
  actions.setUnderline,
  actions.removeFormat,
  actions.insertBulletsList,
  actions.indent,
  actions.outdent,
  actions.insertLink,
];

function getDefaultIcon() {
  const texts = {};
  // new icon styles of experiment
  texts[actions.insertImage] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/image%403x.png';
  texts[actions.keyboard] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/keyboard%403x.png';
  texts[actions.setBold] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/bold%403x.png';
  texts[actions.setItalic] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/italic%403x.png';
  texts[actions.setSubscript] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/subscript%403x.png';
  texts[actions.setSuperscript] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/superscript%403x.png';
  texts[actions.insertBulletsList] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/ul%403x.png';
  texts[actions.insertOrderedList] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/ol%403x.png';
  texts[actions.insertLink] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/link%403x.png';
  texts[actions.setStrikethrough] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/strikethrough%403x.png';
  texts[actions.setUnderline] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/underline%403x.png';
  texts[actions.insertVideo] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/video%403x.png';
  texts[actions.removeFormat] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/remove_format%403x.png';
  texts[actions.undo] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/undo%403x.png';
  texts[actions.redo] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/redo%403x.png';
  texts[actions.checkboxList] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/checkbox%403x.png';
  texts[actions.table] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/table%403x.png';
  texts[actions.code] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/code%403x.png';
  texts[actions.outdent] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/outdent%403x.png';
  texts[actions.indent] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/indent%403x.png';
  texts[actions.alignLeft] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/justify_left%403x.png';
  texts[actions.alignCenter] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/justify_center%403x.png';
  texts[actions.alignRight] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/justify_right%403x.png';
  texts[actions.alignFull] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/justify_full%403x.png';
  texts[actions.blockquote] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/blockquote%403x.png';
  texts[actions.line] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/line%403x.png';
  texts[actions.fontSize] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/fontSize%403x.png';
  texts[actions.init] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/clear%403.png'
  texts[actions.heading1] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/heading-1%403.png'
  texts[actions.heading2] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/heading-2%403.png'
  texts[actions.heading3] = 'https://revasocialmedia-1307444343.cos.ap-guangzhou.myqcloud.com/arabcariana/richTextEditor/heading-3%403.png'
  return texts;
}

// noinspection FallThroughInSwitchStatementJS
export default class RichToolbar extends Component {
  static defaultProps = {
    actions: defaultActions,
    disabled: false,
    iconTint: '#71787F',
    iconSize: 20,
    iconGap: 16,
  };

  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      items: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let that = this;
    return (
      nextState.items !== that.state.items ||
      nextState.actions !== that.state.actions ||
      nextState.data !== that.state.data ||
      nextProps.style !== that.props.style
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {actions} = nextProps;
    if (actions !== prevState.actions) {
      let {items = []} = prevState;
      return {
        actions,
        data: actions.map(action => ({action, selected: items.includes(action)})),
      };
    }
    return null;
  }

  componentDidMount() {
    setTimeout(this._mount);
  }

  _mount = () => {
    const {editor: {current: editor} = {current: this.props.getEditor?.()}} = this.props;
    if (!editor) {
      // No longer throw an error, just try to re-load it when needed.
      // This is because the webview may go away during long periods of inactivity,
      // and the ref will be lost, causing the entire app to crash in this throw new error.
      //throw new Error('Toolbar has no editor!');
      if (__DEV__) {
        console.warn(
          'Toolbar has no editor. Please make sure the prop getEditor returns a ref to the editor component.',
        );
      }
    } else {
      editor.registerToolbar(selectedItems => this.setSelectedItems(selectedItems));
      this.editor = editor;
    }
  };

  setSelectedItems(items) {
    const {items: selectedItems} = this.state;
    if (this.editor && items !== selectedItems) {
      this.setState({
        items,
        data: this.state.actions.map(action => ({action, selected: items.includes(action)})),
      });
    }
  }

  _getButtonSelectedStyle() {
    return this.props.selectedButtonStyle && this.props.selectedButtonStyle;
  }

  _getButtonUnselectedStyle() {
    return this.props.unselectedButtonStyle && this.props.unselectedButtonStyle;
  }

  _getButtonDisabledStyle() {
    return this.props.disabledButtonStyle && this.props.disabledButtonStyle;
  }

  _getButtonIcon(action) {
    const {iconMap} = this.props;
    if (iconMap && iconMap[action]) {
      return iconMap[action];
    } else {
      return getDefaultIcon()[action];
    }
  }

  handleKeyboard() {
    const editor = this.editor;
    if (!editor) {
      this._mount();
      return;
    }
    if (editor.isKeyboardOpen) {
      editor.dismissKeyboard();
    } else {
      editor.focusContentEditor();
    }
  }

  _onPress(action) {
    const {onPressAddImage, onInsertLink, insertVideo} = this.props;
    const editor = this.editor;

    if (!editor) {
      this._mount();
      return;
    }

    switch (action) {
      case actions.insertLink:
        if (onInsertLink) return onInsertLink();
      case actions.setBold:
      case actions.setItalic:
      case actions.undo:
      case actions.redo:
      case actions.insertBulletsList:
      case actions.insertOrderedList:
      case actions.checkboxList:
      case actions.setUnderline:
      case actions.heading1:
      case actions.heading2:
      case actions.heading3:
      case actions.heading4:
      case actions.heading5:
      case actions.heading6:
      case actions.code:
      case actions.blockquote:
      case actions.line:
      case actions.setParagraph:
      case actions.removeFormat:
      case actions.alignLeft:
      case actions.alignCenter:
      case actions.alignRight:
      case actions.alignFull:
      case actions.setSubscript:
      case actions.setSuperscript:
      case actions.setStrikethrough:
      case actions.setHR:
      case actions.indent:
      case actions.outdent:
        editor.showAndroidKeyboard();
        editor.sendAction(action, 'result');
        break;
      case actions.insertImage:
        onPressAddImage?.();
        break;
      case actions.insertVideo:
        insertVideo?.();
        break;
      case actions.keyboard:
        this.handleKeyboard();
        break;
      default:
        this.props[action]?.();
        break;
    }
  }

  _defaultRenderAction(action, selected) {
    let that = this;
    const icon = that._getButtonIcon(action);
    const {iconSize, iconGap, disabled, itemStyle} = that.props;
    const style = selected ? that._getButtonSelectedStyle() : that._getButtonUnselectedStyle();
    const tintColor = disabled
      ? that.props.disabledIconTint
      : selected
      ? that.props.selectedIconTint
      : that.props.iconTint;
    return (
      <TouchableOpacity
        key={action}
        disabled={disabled}
        style={[{width: iconGap + iconSize}, styles.item, itemStyle, style]}
        onPress={() => that._onPress(action)}>
        {icon ? (
          typeof icon === 'function' ? (
            icon({selected, disabled, tintColor, iconSize, iconGap})
          ) : (
            <Image
              source={{
                uri: icon
              }}
              style={{
                tintColor,
                height: iconSize,
                width: iconSize,
              }}
            />
          )
        ) : null}
      </TouchableOpacity>
    );
  }

  _renderAction(action, selected) {
    return this.props.renderAction
      ? this.props.renderAction(action, selected)
      : this._defaultRenderAction(action, selected);
  }

  render() {
    const {style, disabled, children, flatContainerStyle,extraProps} = this.props;
    const vStyle = [styles.barContainer, style, disabled && this._getButtonDisabledStyle()];
    return (
      <View style={vStyle}>
        <FlatList
          indicatorStyle='white'
          horizontal
          scrollEnabled
          keyboardShouldPersistTaps={'always'}
          keyExtractor={(item, index) => item.action + '-' + index}
          data={this.state.data}
          alwaysBounceHorizontal={true}
          showsHorizontalScrollIndicator={true}
          renderItem={({item}) => this._renderAction(item.action, item.selected)}
          contentContainerStyle={flatContainerStyle}
          {...extraProps}
        />
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barContainer: {
    height: 44,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
