/*
Navicat MySQL Data Transfer

Source Server         : self
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : example

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-03-30 20:05:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for auth_navigation
-- ----------------------------
DROP TABLE IF EXISTS `auth_navigation`;
CREATE TABLE `auth_navigation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `l_index` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of auth_navigation
-- ----------------------------
INSERT INTO `auth_navigation` VALUES ('1', '1', '系统管理');

-- ----------------------------
-- Table structure for auth_oper
-- ----------------------------
DROP TABLE IF EXISTS `auth_oper`;
CREATE TABLE `auth_oper` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `auth_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `l_index` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `page_auth_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of auth_oper
-- ----------------------------
INSERT INTO `auth_oper` VALUES ('1', 'ADD_USER', '1', '新增用户', '1');
INSERT INTO `auth_oper` VALUES ('2', 'OPER_USER', '2', '停用/启用用户', '1');
INSERT INTO `auth_oper` VALUES ('3', 'EDIT_USER', '3', '编辑用户', '1');
INSERT INTO `auth_oper` VALUES ('4', 'DELETE_USER', '4', '删除用户', '1');
INSERT INTO `auth_oper` VALUES ('5', 'ADD_ROLE', '5', '新增角色', '2');
INSERT INTO `auth_oper` VALUES ('6', 'EDIT_ROLE', '6', '编辑角色', '2');
INSERT INTO `auth_oper` VALUES ('7', 'DELETE_ROLE', '7', '删除角色', '2');

-- ----------------------------
-- Table structure for auth_page
-- ----------------------------
DROP TABLE IF EXISTS `auth_page`;
CREATE TABLE `auth_page` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `auth_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `l_index` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `navigation_id` bigint(20) DEFAULT NULL,
  `page_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of auth_page
-- ----------------------------
INSERT INTO `auth_page` VALUES ('1', 'USER', '1', '用户管理', '1', '/user');
INSERT INTO `auth_page` VALUES ('2', 'ROLE', '2', '角色管理', '1', '/role');

-- ----------------------------
-- Table structure for auth_role
-- ----------------------------
DROP TABLE IF EXISTS `auth_role`;
CREATE TABLE `auth_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of auth_role
-- ----------------------------
INSERT INTO `auth_role` VALUES ('1', '2015-08-14 15:05:31', '0', '超级管理员');

-- ----------------------------
-- Table structure for auth_role_auth
-- ----------------------------
DROP TABLE IF EXISTS `auth_role_auth`;
CREATE TABLE `auth_role_auth` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `auth_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of auth_role_auth
-- ----------------------------
INSERT INTO `auth_role_auth` VALUES ('1', '1', '1', 'PAGE');
INSERT INTO `auth_role_auth` VALUES ('2', '2', '1', 'PAGE');
INSERT INTO `auth_role_auth` VALUES ('3', '1', '1', 'OPER');
INSERT INTO `auth_role_auth` VALUES ('4', '2', '1', 'OPER');
INSERT INTO `auth_role_auth` VALUES ('5', '3', '1', 'OPER');
INSERT INTO `auth_role_auth` VALUES ('6', '4', '1', 'OPER');
INSERT INTO `auth_role_auth` VALUES ('7', '5', '1', 'OPER');
INSERT INTO `auth_role_auth` VALUES ('8', '6', '1', 'OPER');
INSERT INTO `auth_role_auth` VALUES ('9', '7', '1', 'OPER');

-- ----------------------------
-- Table structure for auth_user_role
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_role`;
CREATE TABLE `auth_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of auth_user_role
-- ----------------------------
INSERT INTO `auth_user_role` VALUES ('1', '1', '1');

-- ----------------------------
-- Table structure for emay_user
-- ----------------------------
DROP TABLE IF EXISTS `emay_user`;
CREATE TABLE `emay_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `create_user_id` bigint(20) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_state` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of emay_user
-- ----------------------------
INSERT INTO `emay_user` VALUES ('1', '2015-08-14 13:29:47', null, 'admin@emay.cn', '11111111111', '总管', 'c3284d0f94606de1fd2af172aba15bf3', '2', 'admin');
