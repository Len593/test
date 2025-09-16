//
//  RCIMIWGroupInfo.h
//  RongIMWrapper
//
//  Created by Lang on 2024/11/22.
//  Copyright © 2024 RongCloud. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RongIMWrapper/RCIMIWDefines.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWGroupInfo : NSObject

/// 群组 ID
@property (nonatomic, copy) NSString *groupId;

/// 群名称
@property (nonatomic, copy) NSString *groupName;

/// 群头像 URL 地址，长度不超过 128 个字符
@property (nonatomic, copy, nullable) NSString *portraitUri;

/// 群简介，长度不超过 512 个字符
@property (nonatomic, copy, nullable) NSString *introduction;

/// 群公告，长度不超过 1024 个字符
@property (nonatomic, copy, nullable) NSString *notice;

/// 扩展信息，
/// 自定义属性需要通过开发者后台或 服务端 API 设置后才能使用，否则返回设置失败
@property (nonatomic, strong) NSDictionary<NSString *, NSString *> *extProfile;

/// 主动加入群权限
/// 默认需要群主验证
@property (nonatomic, assign) RCIMIWGroupJoinPermission joinPermission;

/// 移除群成员权限
/// 默认群主
@property (nonatomic, assign) RCIMIWGroupOperationPermission removeMemberPermission;

/// 邀请他人入群权限
/// 默认群主
@property (nonatomic, assign) RCIMIWGroupOperationPermission invitePermission;

/// 被邀请加入群组权限
/// 默认不需要被邀请人同意
@property (nonatomic, assign) RCIMIWGroupInviteHandlePermission inviteHandlePermission;

/// 修改群资料权限
/// 默认群主
@property (nonatomic, assign) RCIMIWGroupOperationPermission groupInfoEditPermission;

/// 修改群成员资料权限
/// 默认群主、群管理员、自已都可以
@property (nonatomic, assign) RCIMIWGroupMemberInfoEditPermission memberInfoEditPermission;

#pragma mark - 只读属性

/// 创建者 userId
@property (nonatomic, copy) NSString *creatorId;

/// 群主 userId
@property (nonatomic, copy) NSString *ownerId;

/// 群备注
/// 自己设置备注名，其他人看不到
@property (nonatomic, copy, nullable) NSString *remark;

/// 群组创建时间。
@property (nonatomic, assign) long long createTime;

/// 群当前成员人数。
@property (nonatomic, assign) NSUInteger membersCount;

/// 当前用户加入时间：用户多次加入群组时，以最后一次加入时间为准
@property (nonatomic, assign) long long joinedTime;

/// 我的群身份
@property (nonatomic, assign) RCIMIWGroupMemberRole role;

@end

NS_ASSUME_NONNULL_END
