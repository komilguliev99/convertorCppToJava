
export default class Convertor {
    constructor(options) {
        this.from = 'cpp';
        this.to = 'java';

        this.areaConvertID = '#from__code';
        this.convertedAreaID = '#to__code';

        this.cppMap = options.cppMap;
        this.standartClass = options.standartClass;
        this.cppFuncReg = options.cppFuncReg;
        this.cppRead = options.cppRead;
    }

    setOptions(from, to) {
        this.from = from;
        this.to = to;
    }

    setCode(file) {
        if(file) {
        
        } else {
            this.allCode = document.querySelector(this.areaConvertID).value;
        }
        let index = this.allCode.search(/int {1,}main\(\)/g);
        this.mainPart = this.allCode.slice(index);
        this.beforeMain = this.allCode.slice(0, index);
    }

    getConvertedCode() {
        return this.convertedCode;
    }

    varCallBack(match) {
        const type = match.split(' ')[0];
        match = match.replace(/(,| {0,}= {0,}[A-z,0-9]{0,}|;)/g,'');
        let arrVar = match.split(' ');
        const variables = arrVar.map(el => {
            return {variable: el, type: type};
        });

        let stateArr = this.funcInfo[this.iteration].variables;
        this.funcInfo[this.iteration].variables = stateArr.concat(variables.slice(1)); 
        console.log(stateArr);
    }

    setVariables() {
        const func = this.funcInfo;
        const callBack = this.varCallBack.bind(this);
        for(let i = 0; i < func.length; i++) {
            func[i].variables = [];
            this.iteration = i;
            let funcBody = func[i].functionBody;
            if(funcBody)
                funcBody.replace(/(int|float|double|char|string|bool) {1,}[A-z0-9_\-=+/*% "',]{1,};/g, callBack);
        }
    }

    setFuncInfo() {
        const code = this.allCode;
        const funcReg = this.cppFuncReg;
        const bindCall = funcReg.callBack.bind(funcReg);
        let finalCode;
    
        const Indexes = [];
        let index, codeProto = code;
        index = codeProto.search(funcReg.regExp);
        while(index !== -1) {
            Indexes.push(index);
            codeProto = codeProto.slice(0, index) + '222' + codeProto.slice(index + 3);
            index = codeProto.search(funcReg.regExp);
        } 
        let functionBody = [];
        for(let i = 0; i < Indexes.length; i++) {
            if(Indexes[i+1]) {
                functionBody.push(code.slice(Indexes[i], Indexes[i+1]));
            } else {
                functionBody.push(code.slice(Indexes[i]));
            }
        }

        finalCode = code.replace(funcReg.regExp, bindCall);
    
        for(let i = 0; i < functionBody.length; i++)
            funcReg.info[i].functionBody = functionBody[i];
        
        this.funcInfo = funcReg.info;   
        finalCode = finalCode.replace(/(#include {1,}(<|")(.){0,}(>|"))|(using {1,}namespace {1,}std{1,};)/g, '');

        this.beforeMain = finalCode;

        this.setVariables();
        console.log(this.funcInfo);
    }

    convertCode(to) {

        if(to == 'java') {
            let standartClass = this.standartClass;

            this.setFuncInfo();
            let info = '\n';

            let callBack = this.cppRead.callBack.bind(this);
            for(let i = 0; i < this.funcInfo.length; i++) {
                this.iteration = i;
                if(this.funcInfo[i].function != 'main') {
                    let func = `public static ${this.funcInfo[i].functionBody}`
                    if(func) func = func.replace(this.cppRead.regExp, callBack);
                    info+=func;
                } else {
                    let func = this.funcInfo[i].functionBody;
                    if (func) func = func.replace(this.cppRead.regExp, callBack);
                    this.mainPart = func;
                }
            }
            this.beforeMain = info;

            this.cppMap.forEach((el, key, map) => {
                
                if(!el.callBack) {
                    this.mainPart = this.mainPart.replace(key, el);
                } else {
                    let bindCall = el.callBack.bind(el);
                    this.mainPart = this.mainPart.replace(el.key, bindCall);
                    this.beforeMain = this.beforeMain.replace(el.key, bindCall);
                }
            
            });

            standartClass = standartClass.replace('{main}', this.mainPart);
            standartClass = standartClass.replace('{contentBefore}', this.beforeMain);

            this.convertedCode = standartClass;
        }

        if(this.convertCode) document.querySelector(this.convertedAreaID).value = this.convertedCode;
    }
}