import { AccountTypeMap, BusinessSceneTypeMap } from "./config";
import { dto, ValueGlue } from "./dto.decorator";

@dto()
class FormItemDTO {
    label: string;
    prop: string = undefined;
    rules: any[];

    error: string = undefined;
    desc: string = undefined;

    constructor(data: any) {
        this.label = data.label;
        this.prop = data.prop;
    }
}

new FormItemDTO({
    label: "123"
});

@dto()
class FormDataDto {
    // 账号类型
    @ValueGlue("type")
    accountType: number = AccountTypeMap.BIZ;

    // 账号
    account: string;

    // 业务场景
    businessScene: number = BusinessSceneTypeMap.BACK;

    // 主体证件
    subjectCredentials: string;

    // 找回申请说明函
    backApplication: string;

    // 变更证明
    modifyCredentials: string;

    // 设置登录邮箱
    loginEmail: string;

    // 邮箱验证码
    verificationCode: string;

    // 新管理员姓名
    adminName: string;

    // 新管理员身份证号
    adminIDCardNumber: string;

    // 新管理员手机号
    adminPhoneNumber: string;

    // 短信验证码
    messageCode: string;

    constructor(data: any) {}
}

export { FormItemDTO, FormDataDto };
