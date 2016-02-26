
const snaprt = require('./__snaprt.jsx');
const React = snaprt.react;
const theme = snaprt.reactTheme;
const SnapHeader = theme.SnapHeader;

module.exports = React.createClass({

    render: function() {

        return(<span>

               <pre>{'<SnapHeader {...this.props} heading="string" size="number(1-6)" />'}</pre>

                <SnapHeader {...this.props} heading='<SnapHeader size="1" /> Headings' size="1" />
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec ligula a dui ullamcorper facilisis. Maecenas cursus enim lorem, at facilisis augue pulvinar vitae. Proin id tortor sit amet nunc finibus fringilla sollicitudin vitae justo. Maecenas ornare a elit ac finibus. Nam ullamcorper mauris eu magna facilisis dapibus. Donec eget feugiat risus. Pellentesque auctor leo et orci vulputate iaculis. Vestibulum convallis lectus at fringilla laoreet. Mauris nunc elit, accumsan sed dui quis, euismod laoreet ipsum. Cras congue quam magna, a tincidunt leo molestie in. Pellentesque imperdiet quam a neque pretium facilisis. Phasellus sed lobortis dolor. Pellentesque ullamcorper odio dignissim euismod porta. Praesent nec lorem vitae ex ornare dignissim.</p>
                <SnapHeader {...this.props} heading='<SnapHeader size="2" /> Headings' size="2" />
               <p>Phasellus accumsan venenatis fringilla. Nunc tristique ullamcorper ligula a eleifend. Donec dapibus urna orci, id vulputate dolor dapibus in. Nam magna felis, commodo nec enim nec, sollicitudin commodo risus. Proin sed sagittis enim, id facilisis velit. Suspendisse tincidunt imperdiet libero, sed vulputate erat. Duis ut leo a ex congue sodales quis eu felis. Cras aliquet est tincidunt tellus iaculis iaculis. Donec quam velit, aliquet gravida elit elementum, convallis finibus leo. Nam vel sagittis massa. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                <SnapHeader {...this.props} heading='<SnapHeader size="3" /> Headings' size="3" />
               <p>Etiam quis erat finibus, sollicitudin nulla ac, iaculis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer semper turpis sed varius rutrum. Proin vulputate eros ut magna facilisis ultrices. Vestibulum mi justo, pulvinar quis interdum sit amet, commodo a lectus. Praesent pulvinar sed ex at dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi eu molestie velit. Integer ac quam tristique lacus blandit lacinia sit amet eu ligula.</p>
                <SnapHeader {...this.props} heading='<SnapHeader size="4" /> Headings' size="4" />
               <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce viverra orci nulla, non congue erat luctus vel. Vestibulum laoreet, est eget tristique gravida, metus leo lobortis nisl, non rutrum dui ligula at libero. Vivamus at urna ut tellus elementum aliquam. Proin nisl justo, egestas non dui vel, condimentum suscipit nunc. Maecenas placerat est justo, ac pretium dui tristique nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin tempor convallis nisl ut faucibus. Curabitur in faucibus orci, pellentesque volutpat libero.</p>
                <SnapHeader {...this.props} heading='<SnapHeader size="5" /> Headings' size="5" />
               <p>Sed vulputate turpis nec sapien porttitor ultrices. Sed tempor massa sem, nec aliquam ex volutpat vitae. Aliquam id sem aliquam, pellentesque ligula sed, tempor odio. Quisque gravida a lorem at vestibulum. Pellentesque blandit malesuada mollis. Nulla accumsan euismod nulla, vel hendrerit lorem lobortis eu. Duis ultricies urna non viverra aliquet. Nulla faucibus semper urna ut facilisis. Vivamus vel feugiat mi.</p>
               
               <SnapHeader {...this.props} heading='<SnapHeader size="6" /> Headings' size="6" />
               <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus pulvinar metus lectus, ut molestie tellus auctor in. Vestibulum vitae auctor mauris. Nunc dui metus, molestie non condimentum in, finibus accumsan turpis. Nulla non rhoncus felis, eget suscipit elit. Mauris sagittis enim eu semper molestie. Sed et libero porttitor, ullamcorper enim non, euismod nibh. Proin semper dapibus lectus quis pretium. Curabitur sagittis feugiat rutrum. Duis tincidunt ullamcorper libero at vestibulum. Aliquam interdum mauris sit amet rutrum rutrum. Ut accumsan felis ligula, dictum venenatis ex cursus sed. Maecenas sodales enim eu varius blandit. Donec hendrerit dolor urna, eu volutpat sapien ullamcorper vel. Proin et consequat nulla. Praesent dolor turpis, lacinia at ultricies ac, ultrices non libero.</p>
               
               </span>

        );

    }

});
