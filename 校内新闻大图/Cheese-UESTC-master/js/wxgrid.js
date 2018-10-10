/*!
 * =====================================================
 * wxgrid v1.1.0
 * =====================================================
 */
/**
 * 作者：陈文哲
 * 使用教程：http://blog.csdn.net/wowkk/article/details/52739490
 */
var WXGrid = function() {
    this._rowsCount = 0;
    this.rows = [];
    this._colsCount = 0;
    this.cols = [];
    // _maxCols:4,   //默认最多4列
    this._widths = 100;    //默认总宽度的大小
}

var Data = function(wxgrid){
    this.add = function( key, arr ) {
        if( key == "add" ) {
            return false;
        }
        var arr2 = new Array();
        for( var i = 0;i < wxgrid._rowsCount;i++ ) {
            arr2[ i ] = new Array;
            for( var j = 0;j < wxgrid._colsCount;j++ ) {
                var index = i + j + i * ( wxgrid._colsCount - 1 );
                arr2[ i ][ j ] = arr[ index ];
            }
        }
        this[ key ] = arr2;
        return true;
    }
}

module.exports = function() {

    var _wxgrid = null;

    this.rows = null;
    this.cols = null;
    this.data = null;

    //初始化表格，设置几行几列
    this.init = function( rowsCount, colsCount ) {
        _wxgrid = new WXGrid;
        _wxgrid._rowsCount = rowsCount;
        _wxgrid._colsCount = colsCount;
        //设置行信息
        for( var i = 0;i < rowsCount;i++ ) {
            _wxgrid.rows.push( {
                index: i,
                height: 0   //默认高0
            })
        }
        //设置列信息
        var width = 100 / colsCount / _wxgrid._widths * 100;
        for( var i = 0;i < colsCount;i++ ) {
            _wxgrid.cols.push( {
                index: i,
                width: width   //默认等宽
            })
        }
        //返回行列信息
        this.rows = _wxgrid.rows;
        this.cols = _wxgrid.cols;
        this.data = new Data(_wxgrid);
    }

    //设置行高（不设置的话，默认40高度）
    //传人height,index设置第index+1行的高度
    //只传人height设置所有行的高度
    this.setRowsHeight = function( height, index ) {
        if( index ) {
            index = parseInt( index );
            if( index > 0 && index < _wxgrid.rows.length ) {
                _wxgrid.rows[ index ].height = height;
            }
        }
        else {
            for( var i = 0;i < _wxgrid.rows.length;i++ ) {
                _wxgrid.rows[ i ].height = height;
            }
        }
    }
    
    //设置列宽（不设置的话，默认等宽）
    //传人width,index设置第index+1列的宽度“权重”
    //只传人height设置所有的的宽度“权重”
    this.setColsWidth = function( width, index ) {
        var cols = _wxgrid.cols;
        if( index ) {
            index = parseInt( index );
            if( index > 0 && index < cols.length ) {
                cols[ index ].width = width;
            }
        }
        else {
            for( var i = 0;i < cols.length;i++ ) {
                cols[ i ].width = width;
            }
        }
        //重新计算宽占比例
        _wxgrid._widths = 0;
        for( var i = 0;i < _wxgrid.cols.length;i++ ) {
            _wxgrid._widths = _wxgrid._widths + cols[ i ].width;
        }
        console.log( _wxgrid._widths )
        for( var i = 0;i < _wxgrid.cols.length;i++ ) {
            _wxgrid.cols[ i ].width = cols[ i ].width / _wxgrid._widths * 100;
            console.log( i + "" + _wxgrid.cols[ i ].width )
        }

    }
}
