import { get, post } from 'common/utils/http'
import { saveTokens, saveAccessToken } from '../utils/cookie'

const ACTIVE_VALUE = 1
const SUPER_VALUE = 2

export default class User {
  // 当前用户是否在激活状态
  isActive = null

  // 邮箱
  email = null

  // 权限分组id
  groupId = null

  // 昵称
  nickname = null

  // 是否为超级管理员
  isSuper = null

  // 拥有的权限
  auths = []

  constructor (active, email, groupId, nickname, _super, auths) {
    this.isActive = active === ACTIVE_VALUE
    this.email = email
    this.groupId = groupId
    this.nickname = nickname
    this.isSuper = _super === SUPER_VALUE
    this.auths = auths || []
  }

  /**
   * 用户注册，正式发布时将废弃
   * @param {object} data 注册信息
   */
  static register (data) {
    return post('cms/user/register', data)
  }

  /**
   * 登陆获取tokens
   * @param {string} nickname 昵称
   * @param {string} password 密码
   */
   static async getToken (nickname, password) {
     const tokens = await post('cms/user/login', {
       nickname,
       password
     })
     saveTokens(tokens.access_token, tokens.refresh_token)
     return tokens
  }

  /**
   * 获取当前用户信息，并返回User实例
   */
  static async getInformation () {
    const info = await get('cms/user/information')
    return new User(info.active, info.email, info.group_id, info.nickname, info.super)
  }

  /**
   * 获取当前用户信息和所拥有的权限
   */
  static async getAuths () {
    const info = await get('cms/user/auths')
    console.log(info)
    return new User(info.active, info.email, info.group_id, info.nickname, info.super, info.auths)
  }

  /**
   * 刷新令牌
   */
  static async getRefreshToken() {
    const res = await get('cms/user/refresh')
    saveAccessToken(res.access_token)
  }

  /**
   * 用户修改密码
   * @param {string} newPassword 新密码
   * @param {string} confirmPassword 确认新密码
   * @param {string} oldPassword 旧密码
   */
  static updatePassword({ old_password, new_password, confirm_password }) {
    return post('cms/user/change_password', {
      new_password,
      confirm_password,
      old_password
    })
  }
}
