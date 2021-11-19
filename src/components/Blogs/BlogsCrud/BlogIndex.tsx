import * as React from 'react';

interface BlogsIndexProps {
    
}
 
interface BlogsIndexState {
    
}
 
class BlogsIndex extends React.Component<BlogsIndexProps, BlogsIndexState> {
    constructor(props: BlogsIndexProps) {
        super(props);
        this.state = { };
    }
    render() { 
        return ( <h1 style={{color: "blue"}}>Hello From BlogsIndex</h1> );
    }
}
 
export default BlogsIndex;