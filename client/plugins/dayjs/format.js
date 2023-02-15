export const displayPlugin = (option, dayjsClass, dayjsFactory) => {
    dayjsClass.prototype.fmDDMMYYYY = function (separator = '/') {
        return this.format(`DD${separator}MM${separator}YYY`);
    };

    dayjsClass.prototype.fmHHmmssDDMMYYYY = function (separator = '/') {
        return this.format(`HH:mm:ss DD${separator}MM${separator}YYYY`);
    };

    dayjsClass.prototype.fmHHmmDDMMYYYY = function (separator = '/') {
        return this.format(`HH:mm DD${separator}MM${separator}YYYY`);
    };

    dayjsClass.prototype.fmHHmm = function (separator = ':') {
        return this.format(`HH${separator}mm`);
    };
    dayjsClass.prototype.fmHHmmss = function (separator = ':') {
        return this.format(`HH${separator}mm${separator}ss`);
    };
};
